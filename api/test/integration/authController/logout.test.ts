import axios, { AxiosInstance } from "axios";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";
import userHelper from "../../testing/helpers/users";
import authToken from "../../../src/services/authToken";
import * as refreshTokenStore from "../../../src/data-access/memory-store/refreshTokenStore";
import databaseSetup from "../../../test/testing/databaseSetup";

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
  await model.UserRole.destroy({ where: {} });
  await model.PasswordReset.destroy({ where: {} });
  jest.restoreAllMocks();
});

describe("POST /api/auth/logout", () => {
  it("returns a success response status when no refresh token cookie is provided", async () => {
    const response = await axiosAPIClient.post(endpoint);
    expect(response.status).toBe(200);
  });

  it("removes an existing refresh token from the memory store", async () => {
    // Create a user and a cookie with the refresh token
    const user = await userHelper.createUser();
    const refreshToken = await authToken.create(user!.toJSON(), { expiresIn: 99999 });
    const cookie = `refresh_token=${refreshToken}; Path=/; HttpOnly;`;

    // Put the refresh token in the memory store
    await refreshTokenStore.set(user!.id, refreshToken, 99999);

    const response = await axiosAPIClient.post(
      endpoint,
      {},
      {
        headers: {
          Cookie: cookie,
        },
      },
    );

    const tokenFromStore = await refreshTokenStore.get(user!.id);
    expect(response.status).toBe(200);
    expect(tokenFromStore).toBeFalsy();
  });

  it("returns success response if the token is invalid", async () => {
    const cookie = `refresh_token=invalid.some-invalid.token123456; Path=/; HttpOnly;`;

    const response = await axiosAPIClient.post(
      endpoint,
      {},
      {
        headers: {
          Cookie: cookie,
        },
      },
    );

    expect(response.status).toBe(200);
  });

  it("returns internal error response if a service throws an exception", async () => {
    jest.spyOn(refreshTokenStore, "remove").mockRejectedValue(new Error("Simulated refreshTokenStore error"));

    // Create a valid refresh token cookie
    const user = await userHelper.createUser();
    const refreshToken = await authToken.create(user!.toJSON(), { expiresIn: 99999 });
    const cookie = `refresh_token=${refreshToken}; Path=/; HttpOnly;`;

    const response = await axiosAPIClient.post(
      endpoint,
      {},
      {
        headers: {
          Cookie: cookie,
        },
      },
    );

    expect(response.status).toBe(500);
  });
});
