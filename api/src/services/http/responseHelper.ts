import { Response } from "express";

/**
 * A response with status code 200.
 * Headers can be set for the response by passing in an object of string key value pairs...
 * {
 *   "Authorization": "MyToken"
 * }
 */
export function success(res: Response, message: string = "Success", headers: Record<string, string> = {}, data: unknown = {}): void {
  res.status(200);
  for (const headerName in headers) {
    res.header(headerName, headers[headerName]);
  }
  res.json({
    message,
    data,
  });
}

/**
 * A response with a status code of 204
 */
export function noContent(res: Response, headers: Record<string, string> = {}): void {
  res.status(204);
  for (const headerName in headers) {
    res.header(headerName, headers[headerName]);
  }
}

/**
 * A response with status code 401 for when a request is unauthorized.
 */
export function unauthorized(res: Response, message: string = "Unauthorized", data: unknown = {}): void {
  res.status(401).json({
    message,
    data,
  });
}

/**
 * A response with status code 422, useful for validation related errors.
 */
export function unprocessableContent(res: Response, message: string = "Unprocessable Content", data: unknown = {}): void {
  res.status(422).json({
    message,
    data,
  });
}

/**
 * A response with status code 500 for general server errors.
 */
export function internalError(res: Response, message: string = "Internal server error", data: unknown = {}): void {
  res.status(500).json({
    message,
    data,
  });
}
