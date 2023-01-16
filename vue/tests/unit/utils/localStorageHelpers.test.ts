import {
  storageGetIsLoggedIn,
  storageGetUser,
  storageSetLogin,
  storageSetUser,
} from "@/utils/localStorageHelpers";
import { MockLocalStorage } from "@/test-utils/MockLocalStorage";

describe("localStorageHelpers", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: new MockLocalStorage(),
    });
  });

  describe("storageGetIsLoggedIn", () => {
    it("returns false if the isLoggedIn value is false in local storage", () => {
      const isLoggedIn = storageGetIsLoggedIn();
      expect(isLoggedIn).toBe(false);
    });

    it("returns true if the isLoggedIn value is true in local storage", () => {
      localStorage.setItem("isLoggedIn", "true");
      const isLoggedIn = storageGetIsLoggedIn();
      expect(isLoggedIn).toBe(true);
    });
  });

  describe("storageSetLogin", () => {
    it("the isLoggedIn value can be set in local storage", () => {
      storageSetLogin("true");
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      expect(isLoggedIn).toBe("true");
      storageSetLogin("false");
      const isNotLoggedIn = localStorage.getItem("isLoggedIn");
      expect(isNotLoggedIn).toBe("false");
    });
  });

  describe("storageGetUser", () => {
    it("returns an empty object if the user does not exist in local storage", () => {
      const user = storageGetUser();
      expect(user).toEqual({});
    });

    it("returns an object with the user details that were set in local storage", () => {
      const user = {
        id: 1,
        name: "Test User",
        email: "test@test.com",
      };
      localStorage.setItem("user", JSON.stringify(user));
      const retrievedUser = storageGetUser();
      expect(retrievedUser).toEqual(user);
    });
  });

  describe("storageSetUser", () => {
    it("the user value can be set in local storage", () => {
      const user = {
        id: 1,
        name: "Test User",
        email: "test@test.com",
      };
      storageSetUser(user);
      const retrievedUser = localStorage.getItem("user")!;
      expect(JSON.parse(retrievedUser)).toEqual(user);
    });
  });
});
