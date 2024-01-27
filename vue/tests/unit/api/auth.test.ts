import {
  APIAuthLogin,
  APIAuthLogout,
  APIAuthRefreshToken,
  APIAuthRegister,
  APIAuthForgotPassword,
  APIAuthResetPassword,
} from "@/api/auth";

import client from "@/http/client";
jest.mock("@/http/client");

describe("auth", () => {
  /* DEPRECATED */
  // describe("APIAuthLoadUser", () => {
  //   it("fetches the user details from the correct endpoint", async () => {
  //     await APIAuthLoadUser();
  //     expect(axios.get).toHaveBeenCalledWith(`${baseURL}/api/user`);
  //   });

  //   it("gets the user details from the response", async () => {
  //     const user = {
  //       id: 1,
  //       name: "Fake User",
  //       email: "test@test.com",
  //     };

  //     getMock.mockResolvedValue(user);
  //     const response = await APIAuthLoadUser();
  //     expect(response).toEqual(user);
  //   });
  // });

  describe("APIAuthLogin", () => {
    it("makes a post request to the correct login endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      const data = {
        email: "test@test.com",
        password: "password",
      };
      await APIAuthLogin(data);
      expect(postMock).toHaveBeenCalledWith("/api/auth/login", data);
    });
  });

  describe("APIAuthRegister", () => {
    it("makes a post request to the correct register endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      const data = {
        name: "Test User",
        email: "test@test.com",
        password: "password",
      };
      await APIAuthRegister(data);
      expect(postMock).toHaveBeenCalledWith("/api/auth/register", data);
    });
  });

  describe("APIAuthLogout", () => {
    it("makes a post request to the correct logout endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      await APIAuthLogout();
      expect(postMock).toHaveBeenCalledWith("/api/auth/logout");
    });
  });

  describe("APIAuthRefreshToken", () => {
    it("makes a post request to the correct refresh token endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      await APIAuthRefreshToken();
      expect(postMock).toHaveBeenCalledWith("/api/auth/refresh-token");
    });
  });

  describe("APIAuthForgotPassword", () => {
    it("makes a post request to the correct forgot password endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      const data = {
        email: "test@test.com",
      };
      await APIAuthForgotPassword(data);
      expect(postMock).toHaveBeenCalledWith("/api/auth/forgot-password", data);
    });
  });

  describe("APIAuthResetPassword", () => {
    it("makes a post request to the correct reset password endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      const token = "token123456";
      const data = {
        password: "password",
        password_verify: "password",
      };
      await APIAuthResetPassword(token, data);
      expect(postMock).toHaveBeenCalledWith(
        `/api/auth/reset-password/${token}`,
        data
      );
    });
  });
});
