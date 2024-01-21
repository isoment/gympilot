import { MiddlewareContext, MiddlewareFunction } from "./types";

export default function middlewarePipeline(
  context: MiddlewareContext,
  middleware: MiddlewareFunction[],
  index: number
) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}
