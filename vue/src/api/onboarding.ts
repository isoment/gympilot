import { AxiosPromise } from "axios";
import client from "@/http/client";
import { OnboardingRequestBody } from "./types";

export const APIOnboarding = (params: OnboardingRequestBody): AxiosPromise => {
  return client.post("/api/onboarding", params);
};
