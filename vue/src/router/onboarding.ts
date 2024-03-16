import ownerOnboarding from "./middleware/ownerOnboarding";

export const onboarding = [
  {
    path: "/onboarding",
    name: "onboarding",
    component: () => import("@/views/owner/OwnerOnboarding.vue"),
    meta: { middleware: [ownerOnboarding] },
  },
];
