import { AxiosPromise } from "axios";
import client from "@/http/client";
import { OnboardingRequestBody } from "gympilot-shared-resources";

export const APIOnboarding = (params: OnboardingRequestBody): AxiosPromise => {
  return client.post("/api/onboarding", params);
};
