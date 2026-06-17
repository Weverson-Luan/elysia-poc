/**
 * IMPORTS
 */

import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { globalError } from "./plugins/global-error";
import { validationError } from "./plugins/validation-error";
import { routes } from "./routes";
import { auth } from "@/modules/auth/auth-main";
import { betterAuthPlugin } from "./plugins/better-auth";

export const app = new Elysia()
  .use(validationError)
  .use(globalError)
  .use(betterAuthPlugin)
  .use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "Origin"],
      exposeHeaders: ["set-auth-token"],
    }),
  )
  .use(routes);
