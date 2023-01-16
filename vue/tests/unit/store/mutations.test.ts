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
        name: "Test User",
        email: "test@test.com",
        created_at: "Date",
        updated_at: "Date",
      };
      const initialState = createState({ user: {} });
      mutations.SET_USER(initialState, user);
      expect(initialState.user).toEqual(user);
    });
  });
});
