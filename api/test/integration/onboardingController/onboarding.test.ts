import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import * as roleHelper from "../..//testing/helpers/role";
import * as userHelper from "../../testing/helpers/user";
import * as tokenHelper from "../../testing/helpers/token";

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

const requestWithValidAccessToken = async (body: object = {}) => {
  const user = await userHelper.createUser({}, "password", ["owner"]);
  const accessToken = await tokenHelper.createAccessToken(user!);
  return await axiosAPIClient.post(endpoint, body, {
    headers: {
      Authorization: accessToken,
    },
  });
};

const validOnboardingRequest = (params: object = {}): any => {
  return {
    organization: {
      organization_name: "Test Organization",
      location_name: "Test location",
      street_address: "123 Fake St",
      city: "Faketown",
      postal_code: "61521",
      country: "US",
    },
    programs: ["personal-training", "cardio", "gymnastics"],
    timezone: {
      timezone: "America/New_York",
      date_format: "MM/DD/YYYY",
      time_format: "24HR",
    },
    billing: {
      currency: "EUR",
      billing_date: "last-of-month",
      allow_cancellation: 1,
    },
    ...params,
  };
};

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

  describe("the request body has the correct fields", () => {
    it("requires an organization, programs, timezone and billing object", async () => {
      const response = await requestWithValidAccessToken({});
      expect(response.status).toBe(422);
      expect(response.data.errors).toHaveProperty("organization");
      expect(response.data.errors).toHaveProperty("programs");
      expect(response.data.errors).toHaveProperty("timezone");
      expect(response.data.errors).toHaveProperty("billing");
    });

    describe("the organization object", () => {
      it("requires the organization fields", async () => {
        const response = await requestWithValidAccessToken({
          organization: {},
        });
        expect(response.status).toBe(422);

        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.organization_name")).toBeTruthy();
        expect(errors.hasOwnProperty("organization.location_name")).toBeTruthy();
        expect(errors.hasOwnProperty("organization.street_address")).toBeTruthy();
        expect(errors.hasOwnProperty("organization.city")).toBeTruthy();
        expect(errors.hasOwnProperty("organization.postal_code")).toBeTruthy();
        expect(errors.hasOwnProperty("organization.country")).toBeTruthy();
      });

      it("requires the organization name to be less 255 characters or less", async () => {
        const body = validOnboardingRequest();
        body.organization.organization_name = "a".repeat(256);
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.organization_name")).toBeTruthy();
      });

      it("requires the organization name to be a string", async () => {
        const body = validOnboardingRequest();
        body.organization.organization_name = ["a", "b"];
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.organization_name")).toBeTruthy();
      });

      it("requires the location name to be less 255 characters or less", async () => {
        const body = validOnboardingRequest();
        body.organization.location_name = "a".repeat(256);
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.location_name")).toBeTruthy();
      });

      it("requires the location name to be a string", async () => {
        const body = validOnboardingRequest();
        body.organization.location_name = false;
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.location_name")).toBeTruthy();
      });

      it("requires the street address to be less 255 characters or less", async () => {
        const body = validOnboardingRequest();
        body.organization.street_address = "a".repeat(256);
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.street_address")).toBeTruthy();
      });

      it("requires the street address to be a string", async () => {
        const body = validOnboardingRequest();
        body.organization.street_address = false;
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.street_address")).toBeTruthy();
      });

      it("requires the city to be less 255 characters or less", async () => {
        const body = validOnboardingRequest();
        body.organization.city = "a".repeat(256);
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.city")).toBeTruthy();
      });

      it("requires the city to be a string", async () => {
        const body = validOnboardingRequest();
        body.organization.city = false;
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.city")).toBeTruthy();
      });

      it("requires the postal code to be less 255 characters or less", async () => {
        const body = validOnboardingRequest();
        body.organization.postal_code = "a".repeat(256);
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.postal_code")).toBeTruthy();
      });

      it("requires the postal code to be a string", async () => {
        const body = validOnboardingRequest();
        body.organization.postal_code = { a: "Test" };
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.postal_code")).toBeTruthy();
      });

      it("requires the country to be less 255 characters or less", async () => {
        const body = validOnboardingRequest();
        body.organization.country = "a".repeat(256);
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.country")).toBeTruthy();
      });

      it("requires the country to be a valid country", async () => {
        const body = validOnboardingRequest();
        body.organization.country = "Fake country code";
        const response = await requestWithValidAccessToken(body);
        console.log(response.data);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.country")).toBeTruthy();
      });
    });
  });
});
