/**
 *  Check if the isLoggedIn value is true
 *  @returns {boolean}
 */
export const storageGetIsLoggedIn = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};

/**
 *  Set isLoggedIn value to true
 *  @returns {void}
 */
export const storageSetLogin = (): void => {
  localStorage.setItem("isLoggedIn", "true");
};
