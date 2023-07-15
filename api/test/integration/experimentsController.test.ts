import { startWebServer, stopWebServer } from "../../src/server/server";
import axios, { AxiosInstance } from "axios";

let axiosAPIClient: AxiosInstance;

beforeAll(async () => {
  console.log(process.env.NODE_ENV);
  const apiConnection = await startWebServer();
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${apiConnection.port}`,
    // Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
    validateStatus: () => true,
  };
  axiosAPIClient = axios.create(axiosConfig);
});

afterAll(async () => {
  stopWebServer();
});

describe("GET /", () => {
  it("returns a 200 status for a successful request", async () => {
    const response = await axiosAPIClient.get("/api/experiments");
    expect(response.status).toBe(200);
  });

  it("returns the correct json response for a successful request", async () => {
    const response = await axiosAPIClient.get("/api/experiments");
    expect(response.data).toMatchObject({
      test: "Hello World",
    });
  });
});
