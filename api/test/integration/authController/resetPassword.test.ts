import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";
import userHelper from "../..//testing/helpers/users";
import * as passwordResetRepository from "../../../src/data-access/repositories/passwordResetRepository";
import { email } from "../../../src/services/notification/email/email";

const endpoint = "/api/auth/reset-password/";
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

describe("POST /api/auth/reset-password", () => {
  const createRequestBody = (params = {}) => {
    return {
      password: "password",
      password_verify: "password",
      ...params,
    };
  };

  it("returns a unprocessable content error when the reset token is not valid", async () => {
    const body = createRequestBody();
    const resetToken = "123faketoken";
    const response = await axiosAPIClient.post(endpoint + resetToken, body);
    expect(response.status).toBe(422);
  });

  it("requires a password field", async () => {
    const body = _.omit(createRequestBody(), "password");
    const resetToken = "123faketoken";
    const response = await axiosAPIClient.post(endpoint + resetToken, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password");
  });

  it("requires a password to be 8 characters or greater", async () => {
    const body = createRequestBody({
      password: "abc1234",
    });
    const resetToken = "123faketoken";
    const response = await axiosAPIClient.post(endpoint + resetToken, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password");
  });

  // Max length, add to other tests as well
});
