export const onboarding = [
  {
    path: "/onboarding",
    name: "Onboarding",
    component: () => import("@/layouts/OnboardingLayout.vue"),
    meta: { middleware: [] },
  },
];
