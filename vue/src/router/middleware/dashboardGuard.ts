import { MiddlewareContext, MiddlewareFunction } from "../types";
import router from "..";
import { USER_HAS_ROLE } from "@/store/constants";

const dashboard: MiddlewareFunction = (context: MiddlewareContext) => {
  const { next, store } = context;
  const isOwner = store.getters[USER_HAS_ROLE]("owner");
  const isEmployee = store.getters[USER_HAS_ROLE]("employee");
  const onboardingNotComplete = store.state.user.onboarding_complete === false;

  // If the owner has not completed onboarding redirect them to it
  if (isOwner && onboardingNotComplete) {
    router.push({ name: "onboarding" });
    return;
  }

  // If the user has these roles give them access to the dashboard
  if (isOwner || isEmployee) {
    return next();
  }

  // Otherwise redirect them to the home page
  router.push({ name: "home" });
  return;
};

export default dashboard;
