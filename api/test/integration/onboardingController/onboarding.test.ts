import axios, { AxiosInstance } from "axios";
import _ from "lodash";

import { startWebServer, stopWebServer } from "../../../src/server/server";
import model from "../../../src/data-access/models";
import * as roleHelper from "../..//testing/helpers/role";
import * as userHelper from "../../testing/helpers/user";
import * as tokenHelper from "../../testing/helpers/token";
import * as templateHelper from "../../testing/helpers/template";
import { LocationFieldsWithTemplates } from "@base/data-access/models/location";

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
  await templateHelper.createProgramTemplates();
});

afterAll(async () => {
  await model.Template.destroy({ where: {} });
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
      state_province: "Test Province",
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

      it("requires the state province to be less 255 characters or less", async () => {
        const body = validOnboardingRequest();
        body.organization.state_province = "a".repeat(256);
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.state_province")).toBeTruthy();
      });

      it("requires the state province to be a string", async () => {
        const body = validOnboardingRequest();
        body.organization.state_province = false;
        const response = await requestWithValidAccessToken(body);
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.state_province")).toBeTruthy();
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
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("organization.country")).toBeTruthy();
      });
    });

    describe("the programs array", () => {
      it("requires the programs field to be an array", async () => {
        const response = await requestWithValidAccessToken({
          programs: "String",
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("programs")).toBeTruthy();
      });

      it("requires the programs array to be all strings", async () => {
        const response = await requestWithValidAccessToken({
          programs: ["gym", 123, ["5"]],
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        // The elements at position 1 and 2 are not strings and therefor invalid
        expect(errors.hasOwnProperty("programs.1")).toBeTruthy();
        expect(errors.hasOwnProperty("programs.2")).toBeTruthy();
      });
    });

    describe("the timezone object", () => {
      it("requires the timezone", async () => {
        const response = await requestWithValidAccessToken({
          timezone: { timezone: "" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("timezone.timezone")).toBeTruthy();
      });

      it("requires the timezone to be valid", async () => {
        const response = await requestWithValidAccessToken({
          timezone: { timezone: "fake/timezone" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("timezone.timezone")).toBeTruthy();
      });

      it("requires the date format", async () => {
        const response = await requestWithValidAccessToken({
          timezone: { date_format: "" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("timezone.date_format")).toBeTruthy();
      });

      it("requires the date format to be valid", async () => {
        const response = await requestWithValidAccessToken({
          timezone: { date_format: "Invalid" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("timezone.date_format")).toBeTruthy();
      });

      it("requires the time format", async () => {
        const response = await requestWithValidAccessToken({
          timezone: { time_format: "" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("timezone.time_format")).toBeTruthy();
      });

      it("requires the time format to be valid", async () => {
        const response = await requestWithValidAccessToken({
          timezone: { time_format: "Invalid" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("timezone.time_format")).toBeTruthy();
      });
    });

    describe("the billing object", () => {
      it("requires the currency", async () => {
        const response = await requestWithValidAccessToken({
          billing: { currency: "" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("billing.currency")).toBeTruthy();
      });

      it("requires the currency to be valid", async () => {
        const response = await requestWithValidAccessToken({
          billing: { currency: "FAKE" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("billing.currency")).toBeTruthy();
      });

      it("requires the billing date", async () => {
        const response = await requestWithValidAccessToken({
          billing: { billing_date: "" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("billing.billing_date")).toBeTruthy();
      });

      it("requires the billing date to be valid", async () => {
        const response = await requestWithValidAccessToken({
          billing: { billing_date: "Invalid" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("billing.billing_date")).toBeTruthy();
      });

      it("requires the allow cancellation field", async () => {
        const response = await requestWithValidAccessToken({
          billing: { allow_cancellation: "" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("billing.allow_cancellation")).toBeTruthy();
      });

      it("requires the allow cancellation field to be a number", async () => {
        const response = await requestWithValidAccessToken({
          billing: { allow_cancellation: "FAKE" },
        });
        expect(response.status).toBe(422);
        const errors = response.data.errors;
        expect(errors.hasOwnProperty("billing.allow_cancellation")).toBeTruthy();
      });
    });
  });

  describe("the onboarding process works as expected", () => {
    it("returns a forbidden response when the owner has already completed onboarding", async () => {
      const body = validOnboardingRequest();
      const user = await userHelper.createUser({ owner_onboarding_complete: true }, "password", ["owner"]);
      const accessToken = await tokenHelper.createAccessToken(user!);

      const response = await axiosAPIClient.post(endpoint, body, {
        headers: {
          Authorization: accessToken,
        },
      });

      expect(response.status).toBe(403);
    });

    it("creates an organization during onboarding", async () => {
      const body = validOnboardingRequest();
      const user = await userHelper.createUser();
      const accessToken = await tokenHelper.createAccessToken(user!);

      const response = await axiosAPIClient.post(endpoint, body, {
        headers: {
          Authorization: accessToken,
        },
      });

      const organization = await model.Organization.findOne({ where: { owner_id: user!.id } });

      expect(response.status).toBe(200);
      expect(organization).not.toBeNull();
      expect(organization!.name).toBe(body.organization.organization_name);
      expect(organization!.country).toBe(body.organization.country);
      expect(organization!.timezone).toBe(body.timezone.timezone);
      expect(organization!.date_format).toBe(body.timezone.date_format);
      expect(organization!.time_format).toBe(body.timezone.time_format);
      expect(organization!.currency).toBe(body.billing.currency);
      expect(organization!.billing_date).toBe(body.billing.billing_date);
      expect(organization!.allow_cancellation).toBe(true);
    });

    it("creates a location during onboarding", async () => {
      const body = validOnboardingRequest();
      const user = await userHelper.createUser();
      const accessToken = await tokenHelper.createAccessToken(user!);

      const response = await axiosAPIClient.post(endpoint, body, {
        headers: {
          Authorization: accessToken,
        },
      });

      const organization = await model.Organization.findOne({ where: { owner_id: user!.id } });
      const location = await model.Location.findOne({ where: { organization_id: organization!.id } });

      expect(response.status).toBe(200);
      expect(location).not.toBeNull();
      expect(location!.name).toBe(body.organization.location_name);
      expect(location!.street_address).toBe(body.organization.street_address);
      expect(location!.state_province).toBe(body.organization.state_province);
      expect(location!.city).toBe(body.organization.city);
      expect(location!.postal_code).toBe(body.organization.postal_code);
    });

    it("links the selected programs to the new location", async () => {
      const body = validOnboardingRequest();
      const user = await userHelper.createUser();
      const accessToken = await tokenHelper.createAccessToken(user!);

      await axiosAPIClient.post(endpoint, body, {
        headers: {
          Authorization: accessToken,
        },
      });

      const organization = await model.Organization.findOne({ where: { owner_id: user!.id } });

      // Get the location with associated templates
      const location = (await model.Location.findOne({
        where: { organization_id: organization!.id },
        include: [
          {
            model: model.Template,
            as: "Templates",
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      })) as LocationFieldsWithTemplates | null;

      const pivotRecords: string[] = [];

      location!.Templates.forEach((template) => {
        pivotRecords.push(template.name);
      });

      // There should be a Template associated with the location for each program
      // selected in the request
      body.programs.forEach((program: string) => {
        if (!pivotRecords.includes(program)) {
          fail(`No pivot record for ${program} program template`);
        }
      });
    });
  });
});
