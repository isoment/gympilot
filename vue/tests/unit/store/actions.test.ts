import actions from "@/store/actions";
import { testJWT } from "../../setup/testJWT";

import client from "@/http/client";
jest.mock("@/http/client");

describe("actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("LOAD_STORED_STATE", () => {
    it("calls the storageGetIsLoggedIn function to get the value from local storage", () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const spy = jest.spyOn(actual, "storageGetIsLoggedIn");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOAD_STORED_STATE(context);
      expect(spy).toHaveBeenCalled();
    });

    it("sets the users logged in state in the store", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOAD_STORED_STATE(context);
      expect(commit).toHaveBeenCalledWith("SET_LOGGED_IN", false);
    });

    it("calls the storageGetUser function to get the user from local storage", () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const spy = jest.spyOn(actual, "storageGetUser");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOAD_STORED_STATE(context);
      expect(spy).toHaveBeenCalled();
    });

    it("sets the user account details in the store", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOAD_STORED_STATE(context);
      expect(commit).toHaveBeenCalledWith("SET_USER", {});
    });
  });

  describe("LOGIN_USER", () => {
    it("sets the isLoggedIn value in local storage to true", () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const storageSetLoginSpy = jest.spyOn(actual, "storageSetLogin");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOGIN_USER(context, testJWT);
      expect(storageSetLoginSpy).toHaveBeenCalledWith("true");
    });

    it("sets the user to logged in in the store", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOGIN_USER(context, testJWT);
      expect(commit).toHaveBeenCalledWith("SET_LOGGED_IN", true);
    });

    it("sets the access token in the store", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOGIN_USER(context, testJWT);

      const removeBearer = testJWT.split(" ")[1];
      expect(commit).toHaveBeenCalledWith("SET_ACCESS_TOKEN", removeBearer);
    });

    /* DEPRECATED */
    // it("calls an action to load the user from the api", () => {
    //   const commit = jest.fn();
    //   const dispatch = jest.fn();
    //   const context = { commit, dispatch };

    //   actions.LOGIN_USER(context, accessToken);
    //   expect(dispatch).toHaveBeenCalledWith("LOAD_USER");
    // });
  });

  describe("LOGOUT_USER", () => {
    it("makes an api call to logout the user", async () => {
      jest.spyOn(client, "post");
      const actual = jest.requireActual("@/api/auth");
      const APIAuthLogoutSpy = jest.spyOn(actual, "APIAuthLogout");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      await actions.LOGOUT_USER(context);
      expect(APIAuthLogoutSpy).toHaveBeenCalled();
    });

    it("calls the SET_LOGGED_IN and SET_USER mutation when the axios promise resolves", async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      await actions.LOGOUT_USER(context);
      expect(commit).toHaveBeenCalledWith("SET_LOGGED_IN", false);
      expect(commit).toHaveBeenCalledWith("SET_USER", {});
    });

    it("sets the user to logged out in the store", async () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const storageSetLoginSpy = jest.spyOn(actual, "storageSetLogin");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      await actions.LOGOUT_USER(context);
      expect(storageSetLoginSpy).toHaveBeenCalledWith("false");
    });

    it("sets the user object to empty in the store", async () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const storageSetUserSpy = jest.spyOn(actual, "storageSetUser");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      await actions.LOGOUT_USER(context);
      expect(storageSetUserSpy).toHaveBeenCalledWith({});
    });

    it("unsets the access token in the store", async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      await actions.LOGOUT_USER(context);
      expect(commit).toHaveBeenCalledWith("UNSET_ACCESS_TOKEN");
    });
  });

  describe("REFRESH_TOKEN", () => {
    it("makes an api call to refresh the access token", async () => {
      jest.spyOn(client, "post");
      const actual = jest.requireActual("@/api/auth");
      const APIAuthRefreshTokenSpy = jest.spyOn(actual, "APIAuthRefreshToken");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      await actions.REFRESH_TOKEN(context);
      expect(APIAuthRefreshTokenSpy).toHaveBeenCalled();
    });

    it("dispatches an action to log a user in when a new access token is returned", async () => {
      const postMock = client.post as jest.Mock;
      const response = {
        data: {},
        headers: { authorization: "TEST_ACCESS_TOKEN" },
      };
      postMock.mockResolvedValue(response);

      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      await actions.REFRESH_TOKEN(context);
      expect(dispatch).toHaveBeenCalledWith("LOGIN_USER", "TEST_ACCESS_TOKEN");
    });
  });

  describe("ADD_TOAST", () => {
    it("commits a SET_TOAST mutation", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      const toast = {
        type: "error",
        message: "Test message",
      };

      actions.ADD_TOAST(context, toast);
      expect(commit).toHaveBeenCalledWith("SET_TOAST", toast);
    });
  });

  describe("REMOVE_TOAST", () => {
    it("commits a UNSET_TOAST mutation", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      const toast = {
        id: "38Fjia108ayhkjakDY2808aiJFsd",
        type: "error",
        message: "Test message",
      };

      actions.REMOVE_TOAST(context, toast);
      expect(commit).toHaveBeenCalledWith("UNSET_TOAST", toast);
    });
  });

  /* DEPRECATED */
  // describe("LOAD_USER", () => {
  //   it("makes an api call to load the user information", async () => {
  //     const actual = jest.requireActual("@/api/auth");
  //     const APIAuthLoadUserSpy = jest.spyOn(actual, "APIAuthLoadUser");
  //     const commit = jest.fn();
  //     const dispatch = jest.fn();
  //     const context = { commit, dispatch };
  //     await actions.LOAD_USER(context);
  //     expect(APIAuthLoadUserSpy).toHaveBeenCalled();
  //   });

  //   it("sets the user in local storage when the axios promise resolves successfully", async () => {
  //     const actual = jest.requireActual("@/utils/localStorageHelpers");
  //     const storageSetUserSpy = jest.spyOn(actual, "storageSetUser");
  //     const commit = jest.fn();
  //     const dispatch = jest.fn();
  //     const context = { commit, dispatch };

  //     // Mock out the axios response from the APIAuthLoadUser endpoint
  //     const response = { data: { id: 1, name: "Test User" } };
  //     getMock.mockResolvedValue(response);

  //     await actions.LOAD_USER(context);
  //     expect(storageSetUserSpy).toHaveBeenCalledWith(response.data);
  //   });

  //   it("calls the SET_USER mutation when the axios promise resolves successfully", async () => {
  //     const commit = jest.fn();
  //     const dispatch = jest.fn();
  //     const context = { commit, dispatch };

  //     // Mock out the axios response from the APIAuthLoadUser endpoint
  //     const response = { data: { id: 1, name: "Test User" } };
  //     getMock.mockResolvedValue(response);

  //     await actions.LOAD_USER(context);
  //     expect(commit).toHaveBeenCalledWith("SET_USER", response.data);
  //   });

  //   it("calls the LOGOUT_USER action if the axios promise is rejected", async () => {
  //     const commit = jest.fn();
  //     const dispatch = jest.fn();

  //     // Mock the axios promise being rejected
  //     getMock.mockRejectedValue(new Error());
  //     await actions.LOAD_USER({ commit, dispatch });
  //     expect(dispatch).toHaveBeenCalledWith("LOGOUT_USER");
  //   });
  // });

  describe("ADD_SESSION_EXPIRED_LAST_ROUTE", () => {
    it("commits a SET_SESSION_EXPIRED_LAST_ROUTE mutation with the last route", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };
      const lastRoute = "/dashboard";

      actions.ADD_SESSION_EXPIRED_LAST_ROUTE(context, lastRoute);

      expect(commit).toHaveBeenCalledWith(
        "SET_SESSION_EXPIRED_LAST_ROUTE",
        lastRoute
      );
    });

    it("sets the last route in local storage", () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const storageSetLastRouteSpy = jest.spyOn(actual, "storageSetLastRoute");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };
      const lastRoute = "/dashboard";

      actions.ADD_SESSION_EXPIRED_LAST_ROUTE(context, lastRoute);

      expect(storageSetLastRouteSpy).toHaveBeenCalledWith(lastRoute);
    });
  });
});
