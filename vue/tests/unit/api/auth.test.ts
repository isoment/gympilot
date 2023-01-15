import axios from "axios";
jest.mock("axios");
import {
  APIAuthCsrf,
  APIAuthLoadUser,
  APIAuthLogin,
  APIAuthLogout,
  APIAuthRegister,
} from "@/api/auth";
const getMock = axios.get as jest.Mock;

const baseURL = process.env.VUE_APP_API_URL;

describe("auth", () => {
  // Test the axios request for the csrf token
  describe("APIAuthCsrf", () => {
    it("makes a csrf token request to the correct endpoint", async () => {
      await APIAuthCsrf();
      expect(axios.get).toHaveBeenCalledWith(`${baseURL}/sanctum/csrf-cookie`);
    });
  });

  // Test the axios request to get teh user details
  describe("APIAuthLoadUser", () => {
    it("fetches the user details from the correct endpoint", async () => {
      await APIAuthLoadUser();
      expect(axios.get).toHaveBeenCalledWith(`${baseURL}/api/user`);
    });

    it("gets the user details from the response", async () => {
      const user = {
        id: 1,
        name: "Fake User",
        email: "test@test.com",
      };

      getMock.mockResolvedValue(user);
      const response = await APIAuthLoadUser();
      expect(response).toEqual(user);
    });
  });

  // Test the axios request for user login
  describe("APIAuthLogin", () => {
    it("makes a post request to the correct login endpoint", async () => {
      const data = {
        email: "test@test.com",
        password: "password",
      };
      await APIAuthLogin(data);
      expect(axios.post).toHaveBeenCalledWith(`${baseURL}/api/login`, data);
    });
  });

  // Test the axios request for user registration
  describe("APIAuthRegister", () => {
    it("makes a post request to the correct register endpoint", async () => {
      const data = {
        name: "Test User",
        email: "test@test.com",
        password: "password",
      };
      await APIAuthRegister(data);
      expect(axios.post).toHaveBeenCalledWith(`${baseURL}/api/register`, data);
    });
  });

  // Test the axios request for user logout
  describe("APIAuthLogout", () => {
    it("makes a post request to the correct logout endpoint", async () => {
      await APIAuthLogout();
      expect(axios.post).toHaveBeenCalledWith(`${baseURL}/api/logout`);
    });
  });
});
