import { OnboardingProgramItem } from "./types";

const programItems: { [key: string]: OnboardingProgramItem[] } = {
  fitness: [
    {
      name: "Person Training",
      value: "personal-training",
    },
    {
      name: "Strength Training",
      value: "strength-training",
    },
    {
      name: "Weight Training",
      value: "weight-training",
    },
    {
      name: "Conditioning",
      value: "conditioning",
    },
    {
      name: "Crossfit",
      value: "crossfit",
    },
    {
      name: "Cardio / Spin",
      value: "cardio",
    },
  ],
  yoga: [
    {
      name: "Yoga",
      value: "yoga",
    },
    {
      name: "Pilates",
      value: "pilates",
    },
  ],
  martialArts: [
    {
      name: "MMA",
      value: "mma",
    },
    {
      name: "Boxing",
      value: "boxing",
    },
    {
      name: "Karate",
      value: "karate",
    },
    {
      name: "Wrestling",
      value: "wrestling",
    },
    {
      name: "Judo",
      value: "judo",
    },
    {
      name: "Other",
      value: "other",
    },
  ],
  gymnastics: [
    {
      name: "Gymnastics",
      value: "gymnastics",
    },
    {
      name: "Dance",
      value: "dance",
    },
  ],
};

export default programItems;
