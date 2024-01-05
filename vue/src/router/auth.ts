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
    path: "/protected-endpoint-test",
    name: "protected-endpoint-test",
    component: () => import("@/views/auth/ProtectedEndpointTest.vue"),
  },
];
