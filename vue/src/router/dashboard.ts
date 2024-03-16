import auth from "./middleware/auth";
import dashboardGuard from "./middleware/dashboardGuard";

export const dashboard = [
  {
    path: "/dashboard",
    component: () => import("@/layouts/DashboardLayout.vue"),
    meta: {
      middleware: [auth, dashboardGuard],
    },
    children: [
      {
        path: "",
        name: "dashboard-home",
        component: () => import("@/views/dashboard/DashboardHome.vue"),
      },
      {
        path: "about",
        name: "dashboard-about",
        component: () => import("@/views/dashboard/DashboardAbout.vue"),
      },
      {
        path: "settings",
        name: "dashboard-settings",
        component: () => import("@/views/dashboard/DashboardSettings.vue"),
      },
    ],
  },
];
