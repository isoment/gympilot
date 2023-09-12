import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import databaseSetup from "../../testing/databaseSetup";
import roleHelper from "../..//testing/helpers/roles";
import userHelper from "../..//testing/helpers/users";
import * as userRepository from "../../../src/data-access/repositories/userRepository";
import authToken from "../../../src/services/authToken";
import { memoryStore } from "../../../src/data-access/memory-store/memoryStore";

const endpoint = "/api/auth/login";
let axiosAPIClient: AxiosInstance;

beforeAll(async () => {
  const apiConnection = await startWebServer();
  // await databaseSetup.migrate();
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${apiConnection.port}`,
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
  await memoryStore.get().flushdb();
});

describe("POST /api/auth/login", () => {
  const createRequestBody = (params = {}) => {
    return {
      email: "user22@test.com",
      password: "password",
      ...params,
    };
  };

  it("requires an email field", async () => {
    const body = _.omit(createRequestBody(), "email");
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("email");
  });

  it("requires email field to be a valid email", async () => {
    const body = createRequestBody({
      email: "a_string",
    });
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

  it("requires the password to be a string", async () => {
    const body = createRequestBody({
      password: [1, 4, 6],
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password");
  });

  it("requires the password to be at least 8 characters", async () => {
    const body = createRequestBody({
      password: "pass",
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password");
  });

  it("returns a 422 response status code if the user is not found", async () => {
    const body = createRequestBody();
    const user = await userRepository.getUser("email", body.email);
    const response = await axiosAPIClient.post(endpoint, body);
    expect(user).toBeNull();
    expect(response.status).toBe(422);
  });

  it("returns a 422 response status code if the provided password does not match the users", async () => {
    const user = await userHelper.createUser();

    const body = createRequestBody({ email: user?.email, password: "wrongPassword" });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
  });

  it("returns a valid jwt access token in the authorization response header with a users information", async () => {
    const user = await userHelper.createUser();

    const body = createRequestBody({ email: user?.email, password: "password123" });
    const response = await axiosAPIClient.post(endpoint, body);

    const authorizationHeader = response.headers["authorization"];
    const [, token] = authorizationHeader.split(" ");

    const decodedJWT: any = await authToken.verify(token);

    expect(response.status).toBe(200);
    expect(decodedJWT).toBeTruthy();
    expect(decodedJWT.id).toBe(user!.id);
    expect(decodedJWT.first_name).toBe(user!.first_name);
    expect(decodedJWT.last_name).toBe(user!.last_name);
    expect(decodedJWT.email).toBe(user!.email);
    expect(decodedJWT.exp).toBeTruthy();
    expect(decodedJWT.Roles.some((role: any) => role.name === "owner")).toBe(true);
    expect(decodedJWT.Roles.some((role: any) => role.name === "employee")).toBe(true);
  });

  it("sets an http only cookie with the refresh token", async () => {
    const user = await userHelper.createUser();

    const body = createRequestBody({ email: user?.email, password: "password123" });
    const response = await axiosAPIClient.post(endpoint, body);

    const cookie = response.headers["set-cookie"];

    const split = cookie![0].split("; ");
    const refreshToken = split[0].replace("refresh_token=", "");

    const decodedJWT: any = await authToken.verify(refreshToken);

    expect(response.status).toBe(200);
    expect(decodedJWT).toBeTruthy();
    expect(decodedJWT.id).toBe(user!.id);
    expect(decodedJWT.first_name).toBe(user!.first_name);
    expect(decodedJWT.last_name).toBe(user!.last_name);
    expect(decodedJWT.email).toBe(user!.email);
    expect(decodedJWT.exp).toBeTruthy();
    expect(decodedJWT.Roles.some((role: any) => role.name === "owner")).toBe(true);
    expect(decodedJWT.Roles.some((role: any) => role.name === "employee")).toBe(true);
  });
});