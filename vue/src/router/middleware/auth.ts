import { MiddlewareContext } from "../types";

export default function auth(context: MiddlewareContext) {
  const { next, store } = context;
  const isLoggedIn = store.state.isLoggedIn;

  if (!isLoggedIn) {
    return next({
      name: "login",
    });
  }

  return next();
}
