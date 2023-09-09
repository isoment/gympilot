import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import databaseSetup from "../../testing/databaseSetup";
import roleHelper from "../..//testing/helpers/roles";
import * as userRepository from "../../../src/data-access/repositories/userRepository";
import authToken from "../../../src/services/authToken";

const endpoint = "/api/auth/register";
let axiosAPIClient: AxiosInstance;

beforeAll(async () => {
  const apiConnection = await startWebServer();
  await databaseSetup.migrate();
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
  await model.UserRoles.destroy({ where: {} });
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
    expect(response.data).toHaveProperty("first_name");
  });

  it("requires a last name field", async () => {
    const body = _.omit(createRequestBody(), "last_name");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("last_name");
  });

  it("requires an email field", async () => {
    const body = _.omit(createRequestBody(), "email");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("email");
  });

  it("requires a password field", async () => {
    const body = _.omit(createRequestBody(), "password");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password");
  });

  it("requires a password verify field", async () => {
    const body = _.omit(createRequestBody(), "password_verify");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password_verify");
  });

  it("requires password and password verify to match", async () => {
    const body = createRequestBody({
      password: "password",
      password_verify: "wordpass",
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password_verify");
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

    const expectedRoles = ["owner", "employee"];
    const actualRoles = [];

    for (const role of user!.Roles) {
      actualRoles.push(role.name);
    }

    expect(response.status).toBe(200);
    expect(user).toBeTruthy();
    expect(expectedRoles).toEqual(actualRoles);
  });

  it("returns a valid jwt access token in the authorization response header with a users information", async () => {
    const requestBody = createRequestBody();
    const response = await axiosAPIClient.post(endpoint, requestBody);

    const user = await userRepository.getUser("email", requestBody.email);

    if (!user) fail("No user found");

    const authorizationHeader = response.headers["authorization"];
    const [, token] = authorizationHeader.split(" ");

    const decodedJWT: any = await authToken.verify(token);

    expect(response.status).toBe(200);
    expect(decodedJWT).toBeTruthy();
    expect(decodedJWT.id).toBe(user.id);
    expect(decodedJWT.first_name).toBe(user.first_name);
    expect(decodedJWT.last_name).toBe(user.last_name);
    expect(decodedJWT.email).toBe(user.email);
    expect(decodedJWT.exp).toBeTruthy();
    expect(decodedJWT.Roles).toHaveLength(2);
    expect(decodedJWT.Roles.some((role: any) => role.name === "owner")).toBe(true);
    expect(decodedJWT.Roles.some((role: any) => role.name === "employee")).toBe(true);
  });
});
