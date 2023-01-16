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
});
