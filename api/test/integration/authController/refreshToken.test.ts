import axios, { AxiosInstance } from "axios";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";
import authToken from "../../../src/services/authToken";
import userHelper from "../../testing/helpers/users";
import * as refreshTokenStore from "../../../src/data-access/memory-store/refreshTokenStore";

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
  jest.restoreAllMocks();
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

  it("returns an unauthorized status code if the token has expired", async () => {
    const user = await userHelper.createUser();

    const expirationTimestamp = Math.floor(Date.now() / 1000) - 3600;
    const refreshToken = await authToken.create(user!.toJSON(), { expiresIn: expirationTimestamp });
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

    expect(response.status).toBe(401);
  });

  it("returns an unauthorized status code if the refresh token does not exist in storage", async () => {
    jest.spyOn(refreshTokenStore, "get").mockReturnValue(Promise.resolve(null));

    const user = await userHelper.createUser();
    const refreshToken = await authToken.create(user!.toJSON(), { expiresIn: 9999999 });
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

    expect(response.status).toBe(401);
  });

  it("returns a new access token when the refresh token is valid and was found in local storage", async () => {
    const user = await userHelper.createUser();
    const refreshToken = await authToken.create(user!.toJSON(), { expiresIn: 9999999 });
    const cookie = `refresh_token=${refreshToken}; Path=/; HttpOnly;`;

    jest.spyOn(refreshTokenStore, "get").mockReturnValue(Promise.resolve(refreshToken));

    const response = await axiosAPIClient.post(
      endpoint,
      {},
      {
        headers: {
          Cookie: cookie,
        },
      },
    );

    const authorizationHeader = response.headers["authorization"];
    const [, token] = authorizationHeader.split(" ");
    const decodedJWT: any = await authToken.verify(token);

    expect(decodedJWT).toBeTruthy();
    expect(response.status).toBe(200);
  });
});
