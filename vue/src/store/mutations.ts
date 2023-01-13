import { SET_LOGGED_IN, SET_USER } from "./constants";
import { GlobalState } from "./types";

const mutations = {
  [SET_LOGGED_IN](state: GlobalState, isLoggedIn: boolean) {
    state.isLoggedIn = isLoggedIn;
  },

  [SET_USER](state: GlobalState, user: {}) {
    state.user = user;
  },
};

export default mutations;
