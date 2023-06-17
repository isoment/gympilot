import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardHome from "@/views/dashboard/DashboardHome.vue";
import DashboardAbout from "@/views/dashboard/DashboardAbout.vue";
import DashboardSettings from "@/views/dashboard/DashboardSettings.vue";

export const dashboard = [
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        component: DashboardHome,
      },
      {
        path: "about",
        component: DashboardAbout,
      },
      {
        path: "settings",
        component: DashboardSettings,
      },
    ],
  },
];
