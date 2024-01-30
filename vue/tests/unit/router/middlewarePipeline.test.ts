// middleware.test.js
import { createStore, Store } from "vuex";
import { GlobalState } from "@/store/types";
import middlewarePipeline from "@/router/middlewarePipeline";
import { MiddlewareContext, MiddlewareFunction } from "@/router/types";

// Define a mock context and a mock middleware function for testing
const createMockContext = () => ({
  to: {
    path: "/example",
    matched: [],
    fullPath: "/example",
    query: {},
    hash: "",
    redirectedFrom: undefined,
    name: null,
    params: {},
    meta: {},
  },
  from: {
    path: "/",
    matched: [],
    fullPath: "/",
    query: {},
    hash: "",
    redirectedFrom: undefined,
    name: null,
    params: {},
    meta: {},
  },
  next: jest.fn(),
  store: createStore<GlobalState>({}),
});

const createMockMiddleware = (next: any) => jest.fn((context) => next(context));

describe("middlewarePipeline", () => {
  it("should execute middleware in order", () => {
    const context = createMockContext();
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
    const context = createMockContext();
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
    const context = createMockContext();

    const pipeline = middlewarePipeline(context, [], 0);
    pipeline();

    expect(context.next).toHaveBeenCalled();
  });
});
