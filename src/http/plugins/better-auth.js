// better-auth.ts
import { auth } from "@/modules/auth/auth-main";
import Elysia from "elysia";
export const betterAuthPlugin = new Elysia({ name: "better-auth" }).mount(auth.handler);
