import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { authRoutes } from "./auth";
import { dashboard } from "./dashboard";

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
  const pageTitle = to.meta.title || "GymPilot";
  document.title = pageTitle as string;
  next();
});

export default router;
