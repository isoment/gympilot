import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import { database } from "../../../src/data-access/models/database";
import model from "../../../src/data-access/models";
import databaseSetup from "../../testing/databaseSetup";
import { Transaction } from "sequelize";

const endpoint = "/api/auth/register";
let axiosAPIClient: AxiosInstance;
let transaction: Transaction;

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
  await databaseSetup.rollback();
  await stopWebServer();
});

beforeEach(async () => {
  transaction = await database.get().transaction();
});

afterEach(async () => {
  await transaction.rollback();
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
});
