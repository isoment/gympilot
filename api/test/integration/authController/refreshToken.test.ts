import axios, { AxiosInstance } from "axios";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";
import authToken from "@base/services/authToken";

const endpoint = "/api/auth/refresh-token";
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
});

describe("POST /api/auth/refresh-token", () => {
  it("returns an unauthorized status code if the request is missing a refresh_token cookie", async () => {
    const response = await axiosAPIClient.post(endpoint);
    expect(response.status).toBe(401);
  });

  it("returns an unauthorized status code if the refresh token is invalid", async () => {
    const cookie = "refresh_token=some_fake_value";

    const response = await axiosAPIClient.post(
      endpoint,
      {},
      {
        headers: {
          Cookie: cookie,
        },
      },
    );

    expect(response.status).toBe(401);
  });

  it("returns an unauthorized status code if the token has expired", async () => {});
});
