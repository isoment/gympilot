import { createMockMiddlewareContext } from "../../../setup/routerHelpers";
import { createUserObject } from "../../../setup/storeHelpers";
import staff from "@/router/middleware/staff";

jest.mock("@/router", () => ({
  push: jest.fn(),
}));

describe("guest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls the next method if the user has an owner or employee role", () => {
    const roles = ["owner", "employee"];

    roles.forEach((role) => {
      const user = createUserObject({ roles: [role] });
      const context = createMockMiddlewareContext({ user });

      staff(context);

      expect(context.next).toHaveBeenCalled();
      expect(require("@/router").push).not.toHaveBeenCalled();
    });
  });

  it("calls the next method if the user has an owner and an employee role", () => {
    const user = createUserObject({ roles: ["owner", "employee"] });
    const context = createMockMiddlewareContext({ user });

    staff(context);

    expect(context.next).toHaveBeenCalled();
    expect(require("@/router").push).not.toHaveBeenCalled();
  });

  it("redirects the user to the home page if they do not have the owner or employee role", () => {
    const user = createUserObject({ roles: ["patron"] });
    const context = createMockMiddlewareContext({ user });

    staff(context);

    expect(require("@/router").push).toHaveBeenCalledWith({ name: "home" });
    expect(context.next).not.toHaveBeenCalled();
  });
});
