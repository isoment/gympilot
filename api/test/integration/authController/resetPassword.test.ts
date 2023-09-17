import axios, { AxiosInstance } from "axios";
import bcrypt from "bcrypt";
import _, { update } from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";
import userHelper from "../..//testing/helpers/users";
import * as passwordResetRepository from "../../../src/data-access/repositories/passwordResetRepository";
import * as userRepository from "../../../src/data-access/repositories/userRepository";
import { minusHours } from "../../../src/services/dateTime";

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
      password: "password1234",
      password_verify: "password1234",
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

  it("requires the password to be under 256 characters", async () => {
    const body = createRequestBody({
      password: "a".repeat(256),
    });
    const resetToken = "123faketoken";
    const response = await axiosAPIClient.post(endpoint + resetToken, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password");
  });

  it("requires a password verify field", async () => {
    const body = _.omit(createRequestBody(), "password_verify");

    const resetToken = "123faketoken";
    const response = await axiosAPIClient.post(endpoint + resetToken, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password_verify");
  });

  it("requires the password verify field to match the password", async () => {
    const body = createRequestBody({
      password: "password1234",
      password_verify: "1234password",
    });
    const resetToken = "123faketoken";
    const response = await axiosAPIClient.post(endpoint + resetToken, body);
    expect(response.status).toBe(422);
    expect(response.data).toHaveProperty("password_verify");
  });

  it("returns an unprocessable content error when the reset token has expired and deletes the old record", async () => {
    await model.PasswordReset.create({
      email: "test@fake.com",
      token: "123uuid123",
      expires: minusHours(new Date(), 1),
    });

    const body = createRequestBody({
      password: "password123456",
      password_verify: "password123456",
    });

    const response = await axiosAPIClient.post(endpoint + "123uuid123", body);

    const passwordReset = await passwordResetRepository.findPasswordReset("token", "123uuid123");

    expect(response.status).toBe(422);
    expect(passwordReset).toBeNull();
  });

  it("resets a users password", async () => {
    const user = await userHelper.createUser({ password: "password" });

    const existingPasswordReset = await passwordResetRepository.createPasswordReset({ email: user!.email });

    const body = createRequestBody({
      password: "password123456",
      password_verify: "password123456",
    });

    const response = await axiosAPIClient.post(endpoint + existingPasswordReset!.token, body);

    const updatedUser = await userRepository.getUser("id", user!.id, false);
    const passwordValid = await bcrypt.compare("password123456", updatedUser!.password);

    expect(response.status).toBe(200);
    expect(updatedUser!.updated_at).not.toEqual(user!.updated_at);
    expect(passwordValid).toBeTruthy();
  });
});
