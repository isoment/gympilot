import { Response } from "express";

/**
 *  A response with status code 200.
 *  Headers can be set for the response by passing in an object of string key value pairs...
 *  {
 *    "Authorization": "MyToken"
 *  }
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
 *  A response with status code 500 for general server errors.
 */
export function internalError(res: Response, message: string = "Internal server error", data: unknown = {}): void {
  res.status(500).json({
    message,
    data,
  });
}
