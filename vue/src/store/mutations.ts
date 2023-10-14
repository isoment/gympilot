import { LoadUser } from "@/api/types";
import {
  SET_TOAST,
  UNSET_TOAST,
  SET_LOGGED_IN,
  SET_USER,
  SET_ACCESS_TOKEN,
  UNSET_ACCESS_TOKEN,
} from "./constants";
import { GlobalState, Toast } from "./types";

const mutations = {
  [SET_LOGGED_IN](state: GlobalState, isLoggedIn: boolean) {
    state.isLoggedIn = isLoggedIn;
  },

  [SET_USER](state: GlobalState, user: LoadUser) {
    state.user = user;
  },

  [SET_ACCESS_TOKEN](state: GlobalState, token: string) {
    state.accessToken = token;
  },

  [UNSET_ACCESS_TOKEN](state: GlobalState) {
    state.accessToken = null;
  },

  [SET_TOAST](state: GlobalState, toast: Toast) {
    state.toasts.push({
      id: (Math.random().toString(36) + Date.now().toString(36)).substring(2),
      ...toast,
    });
  },

  [UNSET_TOAST](state: GlobalState, toastToRemove: Toast) {
    state.toasts = state.toasts.filter((toast) => {
      return toast.id !== toastToRemove.id;
    });
  },
};

export default mutations;
