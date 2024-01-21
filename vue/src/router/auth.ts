import guest from "./middleware/guest";

export const authRoutes = [
  {
    path: "/login",
    name: "login",
    meta: {
      middleware: [guest],
    },
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      middleware: [guest],
    },
    component: () => import("@/views/auth/RegisterView.vue"),
  },
  {
    path: "/password-reset/:token",
    name: "password-reset",
    meta: {
      middleware: [guest],
    },
    component: () => import("@/views/auth/PasswordResetView.vue"),
  },
];
