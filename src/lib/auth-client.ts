import { createAuthClient } from "better-auth/next-js";

export const authClient = createAuthClient({
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});
