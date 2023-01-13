import { Commit, Dispatch } from "vuex";
import {
  LOAD_STORED_STATE,
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOGGED_IN,
} from "./constants";
import { storageGetIsLoggedIn, storageSetLogin } from "../utils/auth";
import { APILoadUser } from "../api/auth";

interface Context {
  commit: Commit;
  dispatch: Dispatch;
}

const actions = {
  [LOAD_STORED_STATE](context: Context) {
    context.commit(SET_LOGGED_IN, storageGetIsLoggedIn());
  },

  [LOGIN_USER](context: Context) {
    storageSetLogin();
    context.dispatch(LOAD_USER);
  },

  [LOGOUT_USER](context: Context) {},

  [LOAD_USER](context: Context) {
    APILoadUser()
      .then((response) => {
        const user = response.data;
      })
      .catch((error) => {
        context.dispatch(LOGOUT_USER);
      });
  },
};

export default actions;
