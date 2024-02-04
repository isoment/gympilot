import middlewarePipeline from "@/router/middlewarePipeline";
import { MiddlewareContext } from "@/router/types";
import { createMockMiddlewareContext } from "../../setup/routerHelpers";

const createMockMiddleware = (next: any) => jest.fn((context) => next(context));

describe("middlewarePipeline", () => {
  it("should execute middleware in order", () => {
    const context = createMockMiddlewareContext();
    const middleware1 = createMockMiddleware((context: MiddlewareContext) =>
      context.next()
    );
    const middleware2 = createMockMiddleware((context: MiddlewareContext) =>
      context.next()
    );

    const pipeline = middlewarePipeline(context, [middleware1, middleware2], 0);
    pipeline();

    expect(middleware1).toHaveBeenCalledWith(
      expect.objectContaining({ next: expect.any(Function) })
    );
    expect(middleware2).toHaveBeenCalledWith(
      expect.objectContaining({ next: context.next })
    );
  });

  it("should stop execution if next is not called", () => {
    const context = createMockMiddlewareContext();
    const middleware1 = createMockMiddleware((context: MiddlewareContext) => {
      return;
    });
    const middleware2 = createMockMiddleware((context: MiddlewareContext) =>
      context.next()
    );

    const pipeline = middlewarePipeline(context, [middleware1, middleware2], 0);
    pipeline();

    expect(middleware2).not.toHaveBeenCalled();
  });

  it("should handle empty middleware array", () => {
    const context = createMockMiddlewareContext();

    const pipeline = middlewarePipeline(context, [], 0);
    pipeline();

    expect(context.next).toHaveBeenCalled();
  });
});
