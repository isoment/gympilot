export const authRoutes = [
  {
    path: "/login",
    name: "login",
    // This generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/auth/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "@/views/auth/RegisterView.vue"
      ),
  },
];
