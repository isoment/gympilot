import { GlobalState } from "./types";

const state = (): GlobalState => {
  return {
    isLoggedIn: false,
    user: {},
    accessToken: null,
    toasts: [],
    sessionExpiredLastRoute: null,
  };
};

export default state;
