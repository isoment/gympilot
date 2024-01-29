import { MiddlewareContext, MiddlewareFunction } from "../types";
import router from "..";
import { USER_HAS_ROLE } from "@/store/constants";

const staff: MiddlewareFunction = (context: MiddlewareContext) => {
  const { next, store } = context;
  const isOwner = store.getters[USER_HAS_ROLE]("owner");
  const isEmployee = store.getters[USER_HAS_ROLE]("employee");

  if (isOwner || isEmployee) {
    return next();
  }

  router.push({ name: "home" });
  return;
};

export default staff;
