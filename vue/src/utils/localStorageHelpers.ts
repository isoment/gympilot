import { LoadUser } from "@/api/types";

/**
 *  Check if the isLoggedIn value is true
 *  @returns {boolean}
 */
export const storageGetIsLoggedIn = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};

/**
 *  Set isLoggedIn value to true
 *  @param {boolean} isLoggedIn
 *  @returns {void}
 */
export const storageSetLogin = (isLoggedIn: string): void => {
  localStorage.setItem("isLoggedIn", isLoggedIn);
};

/**
 *  Get the user object from storage or if it doesn't exist
 *  return an empty object.
 *  @returns {Partial<LoadUser>}
 */
export const storageGetUser = (): Partial<LoadUser> => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {};
};

/**
 *  Set the object containing the authenticated users details
 *  @param {LoadUser} user
 *  @returns {void}
 */
export const storageSetUser = (user: Partial<LoadUser>): void => {
  localStorage.setItem("user", JSON.stringify(user));
};