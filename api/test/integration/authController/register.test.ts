import axios, { AxiosInstance } from "axios";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";

const endpoint = "/api/auth/register";
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

describe("POST /api/auth/register", () => {
  it("returns a 422 response if there is a user registered with the given email", async () => {
    await model.User.create({
      first_name: "Test",
      last_name: "User",
      email: "user22@test.com",
      password: "password",
    });

    const response = await axiosAPIClient.post(endpoint, {
      first_name: "Another",
      last_name: "Guy",
      email: "user22@test.com",
      password: "password",
      password_verify: "password",
    });

    expect(response.status).toBe(422);
  });
});
