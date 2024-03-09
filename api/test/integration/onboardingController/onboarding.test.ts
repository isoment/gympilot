import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";
import userHelper from "../../testing/helpers/users";
import * as tokenHelper from "../../testing/helpers/tokens";

const endpoint = "/api/onboarding";
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
  jest.restoreAllMocks();
});

describe("POST /api/onboarding", () => {
  describe("the authorization middlewares prevent unauthorized access", () => {
    it("returns an unauthorized status code if the request does not include an access token", async () => {
      const response = await axiosAPIClient.post(endpoint);
      expect(response.status).toBe(401);
    });

    it("returns an unauthorized status code if the request includes an invalid access token", async () => {
      const badToken = "Bearer invalid.abcdefg.123456";
      const response = await axiosAPIClient.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: badToken,
          },
        },
      );
      expect(response.status).toBe(401);
    });

    it("returns a forbidden status code if the access token does not have an owner role", async () => {
      const user = await userHelper.createUser({}, "password", ["patron"]);
      const accessToken = await tokenHelper.createAccessToken(user!);
      const response = await axiosAPIClient.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      expect(response.status).toBe(403);
    });
  });
});
