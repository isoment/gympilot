import {
  storageGetIsLoggedIn,
  storageGetUser,
  storageSetLogin,
  storageSetUser,
  storageSetLastRoute,
  storageGetLastRoute,
} from "@/utils/localStorageHelpers";
import { MockLocalStorage } from "@/test-utils/MockLocalStorage";

describe("localStorageHelpers", () => {
  // Use the mock local store
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: new MockLocalStorage(),
    });
  });

  // Ensure the local store is clear after each test
  afterEach(() => {
    localStorage.clear();
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
    it("sets the user value in local storage", () => {
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

  describe("storageSetLastRoute", () => {
    it("sets the last route in local storage", () => {
      const lastRoute = "/dashboard";
      storageSetLastRoute(lastRoute);
      const retrievedLastRoute = localStorage.getItem("lastRoute")!;
      expect(retrievedLastRoute).toBe(lastRoute);
    });
  });

  describe("storageGetLastRoute", () => {
    it("sets the last route in local storage", () => {
      const lastRoute = "/dashboard";
      localStorage.setItem("lastRoute", lastRoute);
      const retrieveLastRoute = storageGetLastRoute();
      expect(retrieveLastRoute).toBe(lastRoute);
    });
  });
});
