import getters from "@/store/getters";
import { createState } from "./utils";
import { createUserObject } from "../../setup/storeHelpers";

describe("getters", () => {
  describe("USER_HAS_ROLE", () => {
    it("returns false if there is no user state in the store", () => {
      const state = createState({ user: {} });
      const hasRole = getters.USER_HAS_ROLE(state)("owner");
      expect(hasRole).toBeFalsy();
    });

    it("returns true if the roles array contains the specified role", () => {
      const user = createUserObject({ roles: ["owner", "admin", "test"] });
      const state = createState({
        user,
      });

      const hasRole = getters.USER_HAS_ROLE(state)("owner");
      expect(hasRole).toBeTruthy();
    });

    it("returns false if the roles array does not contain the specified role", () => {
      const user = createUserObject({ roles: ["patron"] });
      const state = createState({
        user,
      });

      const hasRole = getters.USER_HAS_ROLE(state)("owner");
      expect(hasRole).toBeFalsy();
    });
  });
});
