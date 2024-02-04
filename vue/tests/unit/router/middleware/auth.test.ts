import { createMockMiddlewareContext } from "../../../setup/routerHelpers";
import auth from "@/router/middleware/auth";

jest.mock("@/router", () => ({
  push: jest.fn(),
}));

describe("auth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to login if the user is not logged in", async () => {
    const context = createMockMiddlewareContext({ isLoggedIn: false });

    auth(context);

    expect(require("@/router").push).toHaveBeenCalledWith({ name: "login" });
    expect(context.next).not.toHaveBeenCalled();
  });

  it("calls the next method from the context if the user is logged in", () => {
    const context = createMockMiddlewareContext({ isLoggedIn: true });

    auth(context);

    expect(require("@/router").push).not.toHaveBeenCalled();
    expect(context.next).toHaveBeenCalled();
  });
});
