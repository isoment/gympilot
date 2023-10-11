import mutations from "@/store/mutations";
import { createState } from "./utils";

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
        first_name: "Test",
        last_name: "User",
        email: "test@test.com",
        created_at: "Date",
        updated_at: "Date",
        Roles: [{ name: "owner" }],
      };
      const initialState = createState({ user: {} });
      mutations.SET_USER(initialState, user);
      expect(initialState.user).toEqual(user);
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
});
