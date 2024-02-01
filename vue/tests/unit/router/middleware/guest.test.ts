import { createMockMiddlewareContext } from "../../../setup/routerHelpers";
import guest from "@/router/middleware/guest";

jest.mock("@/router", () => ({
  push: jest.fn(),
}));

describe("guest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to dashboard home if the user is logged in", async () => {
    const context = createMockMiddlewareContext({ isLoggedIn: true });

    guest(context);

    expect(require("@/router").push).toHaveBeenCalledWith({
      name: "dashboard-home",
    });
    expect(context.next).not.toHaveBeenCalled();
  });

  it("calls the next method from the context if the user is not logged in", () => {
    const context = createMockMiddlewareContext({ isLoggedIn: false });

    guest(context);

    expect(require("@/router").push).not.toHaveBeenCalled();
    expect(context.next).toHaveBeenCalled();
  });
});
