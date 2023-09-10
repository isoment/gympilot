import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import databaseSetup from "../../testing/databaseSetup";
import roleHelper from "../..//testing/helpers/roles";
import * as userRepository from "../../../src/data-access/repositories/userRepository";
import authToken from "../../../src/services/authToken";

const endpoint = "/api/auth/login";
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
    console.log(response);
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
});
