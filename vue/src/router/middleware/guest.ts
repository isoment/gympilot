import { MiddlewareContext, MiddlewareFunction } from "../types";
import router from "..";

const guest: MiddlewareFunction = (context: MiddlewareContext) => {
  const { next, store } = context;
  const isLoggedIn = store.state.isLoggedIn;

  if (isLoggedIn) {
    router.push({ name: "dashboard-home" });
    return;
  }

  return next();
};

export default guest;
