import { USER_HAS_ROLE } from "./constants";
import { GlobalState } from "./types";

const getters = {
  [USER_HAS_ROLE]:
    (state: GlobalState) =>
    (role: string): boolean => {
      if (!state.user) return false;
      return state.user.roles?.includes(role) ? true : false;
    },
};

export default getters;
