import { LOGIN_USER } from "./constants";

import { GlobalState } from "./types";

const mutations = {
  [LOGIN_USER](state: GlobalState) {
    state.isLoggedIn = true;
  },
};

export default mutations;
