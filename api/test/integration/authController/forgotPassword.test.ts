import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import roleHelper from "../..//testing/helpers/roles";
import userHelper from "../..//testing/helpers/users";
import * as passwordResetRepository from "../../../src/data-access/repositories/passwordResetRepository";
import { email } from "../../../src/services/notification/email/email";
import databaseSetup from "../../../test/testing/databaseSetup";

const endpoint = "/api/auth/forgot-password";
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
});

describe("POST /api/auth/forgot-password", () => {
  const createRequestBody = (params = {}) => {
    return {
      email: "user22@test.com",
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

  it("returns a 422 response if the email provided does not match a record", async () => {
    const body = createRequestBody({
      email: "user@doesnotexist.com",
    });
    const response = await axiosAPIClient.post(endpoint, body);
    expect(response.status).toBe(422);
  });

  it("creates a record in password resets table and sends an email", async () => {
    const emailSpy = jest.spyOn(email, "passwordReset");

    await userHelper.createUser();

    const body = createRequestBody({
      email: "dudley@dingleberry.com",
    });

    const response = await axiosAPIClient.post(endpoint, body);

    const createdRecord = await passwordResetRepository.findPasswordReset("email", body.email);

    expect(response.status).toBe(200);
    expect(createdRecord).toBeTruthy();

    expect(emailSpy).toHaveBeenCalledTimes(1);
    expect(emailSpy).toHaveBeenCalledWith(body.email, createdRecord!.token);
  });

  it("returns an internal server error if there is an error creating the password reset record", async () => {
    jest.spyOn(passwordResetRepository, "createPasswordReset").mockReturnValue(Promise.resolve(null));

    await userHelper.createUser();

    const body = createRequestBody({
      email: "dudley@dingleberry.com",
    });

    const response = await axiosAPIClient.post(endpoint, body);

    expect(response.status).toBe(500);
  });
});
