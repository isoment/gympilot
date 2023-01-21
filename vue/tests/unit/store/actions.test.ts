import actions from "@/store/actions";
import axios from "axios";
jest.mock("axios");
const postMock = axios.post as jest.Mock;
const getMock = axios.get as jest.Mock;

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

      actions.LOGIN_USER(context);
      expect(storageSetLoginSpy).toHaveBeenCalledWith("true");
    });

    it("calls an action to load the user from the api", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOGIN_USER(context);
      expect(dispatch).toHaveBeenCalledWith("LOAD_USER");
    });

    it("sets the user to logged in in the store", () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      actions.LOGIN_USER(context);
      expect(commit).toHaveBeenCalledWith("SET_LOGGED_IN", true);
    });
  });

  describe("LOGOUT_USER", () => {
    it("calls the SET_LOGGED_IN and SET_USER mutation when the axios promise resolves successfully", async () => {
      postMock.mockResolvedValue({});
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

      // Mock the post axios request to the logout endpoint as resolved.
      postMock.mockResolvedValue({});

      await actions.LOGOUT_USER(context);
      expect(storageSetLoginSpy).toHaveBeenCalledWith("false");
    });

    it("sets the user object to empty in the store", async () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const storageSetUserSpy = jest.spyOn(actual, "storageSetUser");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      postMock.mockResolvedValue({});

      await actions.LOGOUT_USER(context);
      expect(storageSetUserSpy).toHaveBeenCalledWith({});
    });
  });

  describe("LOAD_USER", () => {
    it("sets the user in local storage when the axios promise resolves successfully", async () => {
      const actual = jest.requireActual("@/utils/localStorageHelpers");
      const storageSetUserSpy = jest.spyOn(actual, "storageSetUser");
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      // Mock out the axios response from the APIAuthLoadUser endpoint
      const response = { data: { id: 1, name: "Test User" } };
      getMock.mockResolvedValue(response);

      await actions.LOAD_USER(context);
      expect(storageSetUserSpy).toHaveBeenCalledWith(response.data);
    });

    it("calls the SET_USER mutation when the axios promise resolves successfully", async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const context = { commit, dispatch };

      // Mock out the axios response from the APIAuthLoadUser endpoint
      const response = { data: { id: 1, name: "Test User" } };
      getMock.mockResolvedValue(response);

      await actions.LOAD_USER(context);
      expect(commit).toHaveBeenCalledWith("SET_USER", response.data);
    });

    it("calls the LOGOUT_USER action if the axios promise is rejected", async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();

      // Mock the axios promise being rejected
      getMock.mockRejectedValue(new Error());
      await actions.LOAD_USER({ commit, dispatch });
      expect(dispatch).toHaveBeenCalledWith("LOGOUT_USER");
    });
  });
});
