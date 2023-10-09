import { GlobalState } from "./types";

const state = (): GlobalState => {
  return {
    isLoggedIn: false,
    user: {},
    toasts: [],
  };
};

export default state;
