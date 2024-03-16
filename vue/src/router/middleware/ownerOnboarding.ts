import { MiddlewareContext, MiddlewareFunction } from "../types";
import router from "..";
import { USER_HAS_ROLE } from "@/store/constants";

const ownerOnboarding: MiddlewareFunction = (context: MiddlewareContext) => {
  const { next, store } = context;

  const isOwner = store.getters[USER_HAS_ROLE]("owner");
  const onboardingNotComplete = store.state.user.onboarding_complete === false;

  if (isOwner && onboardingNotComplete) {
    return next();
  }

  if (isOwner) {
    router.push({ name: "dashboard-home" });
    return;
  }

  router.push({ name: "home" });
  return;
};

export default ownerOnboarding;
