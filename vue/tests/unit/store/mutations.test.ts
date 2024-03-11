import mutations from "@/store/mutations";
import { createState } from "./utils";
import { testJWT } from "../../setup/testJWT";

describe("mutations", () => {
  describe("SET_LOGGED_IN", () => {
    it("sets the isLoggedIn state to true", () => {
      const initialState = createState({ isLoggedIn: false });
      mutations.SET_LOGGED_IN(initialState, true);
      expect(initialState.isLoggedIn).toBe(true);
    });

    it("sets the isLoggedIn state to false", () => {
      const initialState = createState({ isLoggedIn: true });
      mutations.SET_LOGGED_IN(initialState, false);
      expect(initialState.isLoggedIn).toBe(false);
    });
  });

  describe("SET_USER", () => {
    it("sets the user state to an object with user details", () => {
      const user = {
        id: 1,
        name: "Test User",
        onboarding_complete: true,
        roles: ["owner"],
      };
      const initialState = createState({ user: {} });
      mutations.SET_USER(initialState, user);
      expect(initialState.user).toEqual(user);
    });
  });

  describe("SET_ACCESS_TOKEN", () => {
    it("sets the users access token", () => {
      const initialState = createState({ accessToken: null });
      mutations.SET_ACCESS_TOKEN(initialState, testJWT);
      expect(initialState.accessToken).toBe(testJWT);
    });
  });

  describe("UNSET_ACCESS_TOKEN", () => {
    it("unsets the access token returning it to null value", () => {
      const initialState = createState({ accessToken: testJWT });
      mutations.UNSET_ACCESS_TOKEN(initialState);
      expect(initialState.accessToken).toBe(null);
    });
  });

  describe("SET_TOAST", () => {
    it("adds a toast to the toasts state", () => {
      const toast = {
        type: "success",
        message: "This operation was a success",
      };
      const initialState = createState({ toasts: [] });
      mutations.SET_TOAST(initialState, toast);
      expect(initialState.toasts[0].type).toBe("success");
      expect(initialState.toasts[0].message).toBe(
        "This operation was a success"
      );
      expect(initialState.toasts[0].id).not.toBe(null);
    });
  });

  describe("UNSET_TOAST", () => {
    it("removes a toast from the toasts state", () => {
      const toast = {
        id: "17029DAJ2u09a28fja18lap1",
        type: "success",
        message: "This operation was a success",
      };
      const initialState = createState({
        toasts: [toast],
      });
      mutations.UNSET_TOAST(initialState, toast);
      expect(initialState.toasts.length).toEqual(0);
    });
  });

  describe("SET_SESSION_EXPIRED_LAST_ROUTE", () => {
    it("sets the session expired last route", () => {
      const lastRoute = "/dashboard";
      const initialState = createState({ sessionExpiredLastRoute: null });
      mutations.SET_SESSION_EXPIRED_LAST_ROUTE(initialState, lastRoute);
      expect(initialState.sessionExpiredLastRoute).toBe(lastRoute);
    });
  });

  describe("UNSET_SESSION_EXPIRED_LAST_ROUTE", () => {
    it("removes the session expired last route", () => {
      const initialState = createState({
        sessionExpiredLastRoute: "/dashboard",
      });
      mutations.UNSET_SESSION_EXPIRED_LAST_ROUTE(initialState);
      expect(initialState.sessionExpiredLastRoute).toBeNull();
    });
  });
});
