import { UserState } from "@/api/types";

export const storageGetIsLoggedIn = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const storageSetLogin = (isLoggedIn: string): void => {
  localStorage.setItem("isLoggedIn", isLoggedIn);
};

/**
 *  Get the user object from storage or if it doesn't exist
 *  return an empty object.
 */
export const storageGetUser = (): Partial<UserState> => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {};
};

export const storageSetUser = (user: Partial<UserState>): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const storageCompleteOnboarding = (): void => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUserObject: UserState = JSON.parse(user);
    parsedUserObject.onboarding_complete = true;
    storageSetUser(parsedUserObject);
  }
};

export const storageSetLastRoute = (route: string): void => {
  localStorage.setItem("lastRoute", route);
};

export const storageGetLastRoute = (): string | null => {
  return localStorage.getItem("lastRoute");
};
