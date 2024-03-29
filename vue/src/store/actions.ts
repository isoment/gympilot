import jwt_decode from "jwt-decode";
import { Commit, Dispatch } from "vuex";
import {
  ADD_TOAST,
  LOAD_STORED_STATE,
  LOGIN_USER,
  LOGOUT_USER,
  REMOVE_TOAST,
  SET_ACCESS_TOKEN,
  SET_LOGGED_IN,
  SET_TOAST,
  SET_USER,
  UNSET_ACCESS_TOKEN,
  UNSET_TOAST,
  REFRESH_TOKEN,
  ADD_SESSION_EXPIRED_LAST_ROUTE,
  SET_SESSION_EXPIRED_LAST_ROUTE,
  SET_OWNER_ONBOARDING_COMPLETE,
  COMPLETE_OWNER_ONBOARDING,
} from "./constants";
import {
  storageGetIsLoggedIn,
  storageGetUser,
  storageSetLogin,
  storageSetUser,
  storageSetLastRoute,
  storageGetLastRoute,
  storageCompleteOnboarding,
} from "../utils/localStorageHelpers";
import { APIAuthLogout, APIAuthRefreshToken } from "../api/auth";
import { UserState } from "@/api/types";
import { Toast } from "./types";

interface Context {
  commit: Commit;
  dispatch: Dispatch;
}

const actions = {
  /**
   *  Here we will get data from local storage and populate the store.
   */
  [LOAD_STORED_STATE](context: Context): void {
    const userIsLoggedIn = storageGetIsLoggedIn();
    context.commit(SET_LOGGED_IN, userIsLoggedIn);
    const userDetails = storageGetUser();
    context.commit(SET_USER, userDetails);
    const lastRoute = storageGetLastRoute();
    context.commit(SET_SESSION_EXPIRED_LAST_ROUTE, lastRoute);
  },

  [LOGIN_USER](context: Context, payload: string): void {
    storageSetLogin("true");

    // We need to decode the token access token and store the user info, we can remove
    // the iat and exp from the JWT payload
    const accessToken = payload.split(" ")[1];
    const user = jwt_decode(accessToken) as Partial<UserState>;
    delete user.iat;
    delete user.exp;

    storageSetUser(user);
    context.commit(SET_USER, user);
    context.commit(SET_ACCESS_TOKEN, accessToken);
    context.commit(SET_LOGGED_IN, true);
  },

  [LOGOUT_USER]: async (context: Context): Promise<void> => {
    await APIAuthLogout();
    context.commit(SET_LOGGED_IN, false);
    context.commit(UNSET_ACCESS_TOKEN);
    context.commit(SET_USER, {});
    storageSetLogin("false");
    storageSetUser({});
  },

  [COMPLETE_OWNER_ONBOARDING](context: Context): void {
    context.commit(SET_OWNER_ONBOARDING_COMPLETE);
    storageCompleteOnboarding();
  },

  /**
   *  If the request to the refresh token endpoint is successful we want
   *  to call the login action setting the new access token
   */
  [REFRESH_TOKEN]: async (context: Context): Promise<void> => {
    const response = await APIAuthRefreshToken();
    const accessToken = response?.headers["authorization"];

    if (accessToken) {
      context.dispatch(LOGIN_USER, accessToken);
    }
  },

  [ADD_TOAST](context: Context, payload: Toast): void {
    context.commit(SET_TOAST, payload);
  },

  [REMOVE_TOAST](context: Context, payload: Toast): void {
    context.commit(UNSET_TOAST, payload);
  },

  /**
   *  **DEPRECATED**
   *  Load the user details from the API and save to state.
   */
  // [LOAD_USER]: async (context: Context) => {
  //   try {
  //     const response = await APIAuthLoadUser();
  //     const user = response.data;
  //     storageSetUser(user);
  //     context.commit(SET_USER, user);
  //   } catch (error) {
  //     context.dispatch(LOGOUT_USER);
  //   }
  // },

  /**
   *  Set the users last route in the store so we can redirect them when they log
   *  back in after session expiration.
   */
  [ADD_SESSION_EXPIRED_LAST_ROUTE](context: Context, payload: string): void {
    context.commit(SET_SESSION_EXPIRED_LAST_ROUTE, payload);
    storageSetLastRoute(payload);
  },
};

export default actions;
