import { GlobalState } from "./types";

const state = (): GlobalState => {
  return {
    isLoggedIn: false,
  };
};

export default state;
