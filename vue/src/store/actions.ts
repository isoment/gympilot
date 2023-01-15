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
  storageGetUser,
  storageSetLogin,
  storageSetUser,
} from "../utils/localStorageHelpers";
import { APIAuthLogout, APIAuthLoadUser } from "../api/auth";

interface Context {
  commit: Commit;
  dispatch: Dispatch;
}

const actions = {
  /**
   *  Check the local storage to see if a user is logged in. Also set
   *  the user if there is a user object in local storage.
   */
  [LOAD_STORED_STATE](context: Context): void {
    const userIsLoggedIn = storageGetIsLoggedIn();
    context.commit(SET_LOGGED_IN, userIsLoggedIn);
    const userDetails = storageGetUser();
    context.commit(SET_USER, userDetails);
  },

  /**
   *  Login the user by setting the local storage and loading the user
   *  details from the API.
   */
  [LOGIN_USER](context: Context): void {
    storageSetLogin("true");
    context.dispatch(LOAD_USER);
    context.commit(SET_LOGGED_IN, true);
  },

  /**
   *  Load the user details from the API and save to state.
   */
  [LOAD_USER](context: Context): void {
    APIAuthLoadUser()
      .then((response) => {
        const user = response.data;
        storageSetUser(user);
        context.commit(SET_USER, user);
      })
      .catch((error) => {
        context.dispatch(LOGOUT_USER);
      });
  },

  /**
   *  Logout a user.
   */
  [LOGOUT_USER](context: Context): void {
    APIAuthLogout()
      .then((response) => {
        context.commit(SET_LOGGED_IN, false);
        context.commit(SET_USER, {});
        storageSetLogin("false");
        storageSetUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default actions;
