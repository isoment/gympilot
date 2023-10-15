import { APIAuthLogin, APIAuthLogout, APIAuthRegister } from "@/api/auth";

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

  // Test the axios request for user login
  describe("APIAuthLogin", () => {
    it("makes a post request to the correct login endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      const data = {
        email: "test@test.com",
        password: "password",
      };
      await APIAuthLogin(data);
      expect(postMock).toHaveBeenCalledWith(`/api/auth/login`, data);
    });
  });

  // Test the axios request for user registration
  describe("APIAuthRegister", () => {
    it("makes a post request to the correct register endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      const data = {
        name: "Test User",
        email: "test@test.com",
        password: "password",
      };
      await APIAuthRegister(data);
      expect(postMock).toHaveBeenCalledWith(`/api/auth/register`, data);
    });
  });

  // Test the axios request for user logout
  describe("APIAuthLogout", () => {
    it("makes a post request to the correct logout endpoint", async () => {
      const postMock = jest.spyOn(client, "post");
      await APIAuthLogout();
      expect(postMock).toHaveBeenCalledWith(`/api/auth/logout`);
    });
  });
});
