import { MiddlewareContext, MiddlewareFunction } from "../types";
import router from "..";

const auth: MiddlewareFunction = (context: MiddlewareContext) => {
  const { next, store } = context;
  const isLoggedIn = store.state.isLoggedIn;

  if (!isLoggedIn) {
    router.push({ name: "login" });
    return;
  }

  return next();
};

export default auth;
