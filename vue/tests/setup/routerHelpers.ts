import { createStore } from "vuex";
import { GlobalState } from "@/store/types";
import getters from "@/store/getters";

const createMockMiddlewareContext = (params: Partial<GlobalState> = {}) => {
  const globalState = {
    isLoggedIn: false,
    user: {},
    accessToken: null,
    toasts: [],
    sessionExpiredLastRoute: null,
    ...params,
  };

  return {
    to: {
      path: "/example",
      matched: [],
      fullPath: "/example",
      query: {},
      hash: "",
      redirectedFrom: undefined,
      name: null,
      params: {},
      meta: {},
    },
    from: {
      path: "/",
      matched: [],
      fullPath: "/",
      query: {},
      hash: "",
      redirectedFrom: undefined,
      name: null,
      params: {},
      meta: {},
    },
    next: jest.fn(),
    store: createStore<GlobalState>({ state: globalState, getters }),
  };
};

export { createMockMiddlewareContext };
