import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { authRoutes } from "./auth";
import { dashboard } from "./dashboard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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

export default router;
