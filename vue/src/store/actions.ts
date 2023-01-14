import { Commit, Dispatch } from "vuex";
import {
  LOAD_STORED_STATE,
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOGGED_IN,
  SET_USER,
} from "./constants";
import {
  storageGetIsLoggedIn,
  storageSetLogin,
} from "../utils/localStorageHelpers";
import { APILoadUser } from "../api/auth";

interface Context {
  commit: Commit;
  dispatch: Dispatch;
}

const actions = {
  /**
   *  Check the local storage to see if a user is logged in.
   *  @param {Context} context
   */
  [LOAD_STORED_STATE](context: Context): void {
    const userIsLoggedIn = storageGetIsLoggedIn();
    context.commit(SET_LOGGED_IN, userIsLoggedIn);
  },

  /**
   *  Login the user by setting the local storage and loading the user
   *  details from the API.
   *  @param {Context} context
   */
  [LOGIN_USER](context: Context): void {
    storageSetLogin();
    context.dispatch(LOAD_USER);
    context.commit(SET_LOGGED_IN, true);
  },

  /**
   *  Load the user details from the API and save to state.
   *  @param {Context} context
   */
  [LOAD_USER](context: Context): void {
    APILoadUser()
      .then((response) => {
        const user = response.data;
        context.commit(SET_USER, user);
      })
      .catch((error) => {
        context.dispatch(LOGOUT_USER);
      });
  },

  /**
   *  Logout a user.
   *  @param {Context} context
   */
  [LOGOUT_USER](context: Context) {},
};

export default actions;
