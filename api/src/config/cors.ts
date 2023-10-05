import { CorsOptions } from "cors";

const allowedOrigins = ["http://localhost", "http://localhost:8080", "127.0.0.1", "127.0.0.1:8080"];

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Check if the origin is in the allowedOrigins array or if it's undefined (for same-origin requests)
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
