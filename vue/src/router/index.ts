import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { authRoutes } from "./auth";
import { dashboard } from "./dashboard";
import { MiddlewareFunction } from "./types";
import middlewarePipeline from "./middlewarePipeline";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/component-test",
    name: "component-test",
    component: () => import("@/views/ComponentTest.vue"),
  },
  ...authRoutes,
  ...dashboard,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title ? `GymPilot | ${to.meta.title}` : "GymPilot";
  document.title = pageTitle as string;

  /* If the route has no middleware defined proceed. */
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware as MiddlewareFunction[];

  const context = {
    to,
    from,
    next,
    store,
  };

  /*
    Call the first middleware function with the context. Override next with the recursive call
    the the middlewarePipeline function. This allows us to go through all the middleware defined
    for a route until a terminating condition is met.
  */
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
