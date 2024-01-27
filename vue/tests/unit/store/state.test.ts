import state from "@/store/state";

describe("state", () => {
  it("stores state to determine if a user is logged in", () => {
    const initialState = state();
    expect(initialState.isLoggedIn).toBe(false);
  });

  it("stores user object state with the authenticated user details", () => {
    const initialState = state();
    expect(initialState.user).toEqual({});
  });

  it("stores users access token", () => {
    const initialState = state();
    expect(initialState.accessToken).toEqual(null);
  });

  it("stores toasts state for displaying notification toasts", () => {
    const initialState = state();
    expect(initialState.toasts).toEqual([]);
  });

  it("stores state to track the last route the user was at when the session expired", () => {
    const initialState = state();
    expect(initialState.sessionExpiredLastRoute).toEqual(null);
  });
});
