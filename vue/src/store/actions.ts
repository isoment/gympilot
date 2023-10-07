import jwt_decode from "jwt-decode";
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
  [LOGIN_USER](context: Context, payload: string): void {
    storageSetLogin("true");

    // We need to decode the token access token and store the user info
    const accessToken = payload.split(" ")[1];
    const user = jwt_decode(accessToken);
    console.log("USER");
    console.log(user);

    // context.dispatch(LOAD_USER);
    context.commit(SET_LOGGED_IN, true);
  },

  /**
   *  **DEPRECATED**
   *  Load the user details from the API and save to state.
   */
  [LOAD_USER]: async (context: Context) => {
    try {
      const response = await APIAuthLoadUser();
      const user = response.data;
      storageSetUser(user);
      context.commit(SET_USER, user);
    } catch (error) {
      context.dispatch(LOGOUT_USER);
    }
  },

  /**
   *  Logout a user.
   */
  [LOGOUT_USER]: async (context: Context) => {
    await APIAuthLogout();
    context.commit(SET_LOGGED_IN, false);
    context.commit(SET_USER, {});
    storageSetLogin("false");
    storageSetUser({});
  },
};

export default actions;
