import { LoadUser } from "@/api/types";

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
export const storageGetUser = (): Partial<LoadUser> => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {};
};

export const storageSetUser = (user: Partial<LoadUser>): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const storageSetLastRoute = (route: string): void => {
  localStorage.setItem("lastRoute", route);
};

export const storageGetLastRoute = (): string | null => {
  return localStorage.getItem("lastRoute");
};
