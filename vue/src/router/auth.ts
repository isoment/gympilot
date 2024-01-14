export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/RegisterView.vue"),
  },
  {
    path: "/password-reset/:token",
    name: "password-reset",
    component: () => import("@/views/auth/PasswordResetView.vue"),
  },
];
