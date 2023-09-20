import axios, { AxiosInstance } from "axios";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";

const endpoint = "/api/auth/logout";
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
  await model.PasswordReset.destroy({ where: {} });
  jest.restoreAllMocks();
});

describe("POST /api/auth/logout", () => {
  it("returns a success response status when no refresh token cookie is provided", async () => {
    const response = await axiosAPIClient.post(endpoint);
    expect(response.status).toBe(200);
  });
});
