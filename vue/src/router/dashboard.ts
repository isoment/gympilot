import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardHome from "@/views/dashboard/DashboardHome.vue";

export const dashboard = [
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        component: DashboardHome,
      },
    ],
  },
];
