import { GlobalState } from "@/store/types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { Store } from "vuex";

// This is the context argument passed into the middleware function
export interface MiddlewareContext {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  store: Store<GlobalState>;
}

// This is the function signature for each vue router middleware
export type MiddlewareFunction = (context: MiddlewareContext) => void;
