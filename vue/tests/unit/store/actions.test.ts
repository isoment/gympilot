import actions from "@/store/actions";

describe("actions", () => {
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
});
