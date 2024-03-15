import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import * as roleHelper from "../..//testing/helpers/role";
import * as userRepository from "../../../src/data-access/repositories/userRepository";
import authToken from "../../../src/services/authToken";
import { memoryStore } from "../../../src/data-access/memory-store/memoryStore";
import * as refreshTokenStore from "../../../src/data-access/memory-store/refreshTokenStore";

const endpoint = "/api/auth/register";
let axiosAPIClient: AxiosInstance;

beforeAll(async () => {
  const apiConnection = await startWebServer();
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${apiConnection.port}`,
    // Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
    validateStatus: () => true,
  };
  axiosAPIClient = axios.create(axiosConfig);
});

afterAll(async () => {
  await stopWebServer();
});

beforeEach(async () => {
  await roleHelper.createRoles();
});

afterEach(async () => {
  await model.User.destroy({ where: {} });
  await model.Role.destroy({ where: {} });
  await model.UserRole.destroy({ where: {} });
  const store = await memoryStore.get();
  store.flushdb();
  jest.restoreAllMocks();
});

describe("POST /api/auth/register", () => {
  const createRequestBody = (params = {}) => {
    return {
      first_name: "Another",
      last_name: "Guy",
      email: "user22@test.com",
      password: "password",
      password_verify: "password",
      ...params,
    };
  };

  it("requires a first name field", async () => {
    const body = _.omit(createRequestBody(), "first_name");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("first_name");
  });

  it("requires a last name field", async () => {
    const body = _.omit(createRequestBody(), "last_name");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("last_name");
  });

  it("requires an email field", async () => {
    const body = _.omit(createRequestBody(), "email");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("email");
  });

  it("requires a password field", async () => {
    const body = _.omit(createRequestBody(), "password");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("password");
  });

  it("requires the password to be a string", async () => {
    const body = createRequestBody({
      password: [1, 4, 6],
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("password");
  });

  it("requires the password to be at least 8 characters", async () => {
    const body = createRequestBody({
      password: "pass",
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("password");
  });

  it("requires the password to be less than 256 characters", async () => {
    const body = createRequestBody({
      password: "a".repeat(256),
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("password");
  });

  it("requires a password verify field", async () => {
    const body = _.omit(createRequestBody(), "password_verify");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("password_verify");
  });

  it("requires password and password verify to match", async () => {
    const body = createRequestBody({
      password: "password",
      password_verify: "wordpass",
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data.errors).toHaveProperty("password_verify");
  });

  it("returns a 422 response if there is a user registered with the given email", async () => {
    await model.User.create({
      first_name: "Test",
      last_name: "User",
      email: "user22@test.com",
      password: "password",
    });
    const response = await axiosAPIClient.post(endpoint, createRequestBody());
    expect(response.status).toBe(422);
  });

  it("creates a user with the correct roles", async () => {
    const requestBody = createRequestBody();
    const response = await axiosAPIClient.post(endpoint, requestBody);

    const user = await userRepository.getUser("email", requestBody.email);

    const expectedRoles = ["owner"];
    const actualRoles = [];

    for (const role of user!.Roles) {
      actualRoles.push(role.name);
    }

    expect(response.status).toBe(200);
    expect(user).toBeTruthy();
    expect(expectedRoles).toEqual(actualRoles);
  });

  it("returns internal server error if the user fails to save in the database", async () => {
    jest.spyOn(userRepository, "createUserWithRole").mockReturnValue(Promise.resolve(null));

    const requestBody = createRequestBody();
    const response = await axiosAPIClient.post(endpoint, requestBody);

    expect(response.status).toBe(500);
  });

  it("returns internal server error if the newly created user can't be fetched", async () => {
    jest.spyOn(userRepository, "getUser").mockReturnValue(Promise.resolve(null));

    const requestBody = createRequestBody();
    const response = await axiosAPIClient.post(endpoint, requestBody);

    expect(response.status).toBe(500);
  });

  it("saves the refresh token to the memory store", async () => {
    const requestBody = createRequestBody();
    const response = await axiosAPIClient.post(endpoint, requestBody);

    // Decode the access token from the response to get the user id
    const authorizationHeader = response.headers["authorization"];
    const [, token] = authorizationHeader.split(" ");
    const decodedJWT: any = await authToken.verify(token);

    // Get the refresh token from the response
    const cookie = response.headers["set-cookie"];
    const split = cookie![0].split("; ");
    const refreshToken = split[0].replace("refresh_token=", "");

    // There should be a refresh token in the memory store
    const refreshTokenFromStore = await refreshTokenStore.get(decodedJWT.id);

    expect(response.status).toBe(200);
    expect(refreshTokenFromStore).toBeTruthy();
    expect(refreshToken).toBe(refreshTokenFromStore);
  });

  it("returns a valid jwt access token in the authorization response header with a users information", async () => {
    const requestBody = createRequestBody();
    const response = await axiosAPIClient.post(endpoint, requestBody);

    const user = await userRepository.getUser("email", requestBody.email);

    const authorizationHeader = response.headers["authorization"];
    const [, token] = authorizationHeader.split(" ");

    const decodedJWT: any = await authToken.verify(token);

    expect(response.status).toBe(200);
    expect(decodedJWT).toBeTruthy();
    expect(decodedJWT.id).toBe(user!.id);
    expect(decodedJWT.name).toBe(`${user!.first_name} ${user!.last_name}`);
    expect(decodedJWT.exp).toBeTruthy();
    expect(decodedJWT.roles.some((role: string) => role === "owner")).toBe(true);
  });

  it("sets an http only cookie with the refresh token", async () => {
    const requestBody = createRequestBody();
    const response = await axiosAPIClient.post(endpoint, requestBody);

    const user = await userRepository.getUser("email", requestBody.email);

    const cookie = response.headers["set-cookie"];

    const split = cookie![0].split("; ");
    const refreshToken = split[0].replace("refresh_token=", "");

    const decodedJWT: any = await authToken.verify(refreshToken);

    expect(response.status).toBe(200);
    expect(decodedJWT).toBeTruthy();
    expect(decodedJWT.id).toBe(user!.id);
    expect(decodedJWT.exp).toBeTruthy();

    expect(split).toContain("HttpOnly");
  });
});
