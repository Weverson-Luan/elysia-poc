/**
 * IMPORTS
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, openAPI } from "better-auth/plugins";
// lib
import { prisma } from "./lib/prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "secret",
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
  advanced: {
    disableCSRFCheck: process.env.ENVIRONMENT === "DEV",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [bearer(), openAPI()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    // password: {
    //   hash: async (password: string) => {
    //     return Bun.password.hash(password);
    //   },
    //   verify: async ({ password, hash }) => {
    //     return Bun.password.verify(password, hash);
    //   },
    // },
  },
});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());
const OpenAPI = {
  getPaths: (prefix = "/auth/api") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);
      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];
        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];
          operation.tags = ["Better Auth"];
        }
      }
      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

export { OpenAPI };
export type Session = typeof auth.$Infer.Session;
export type AuthUser = Session["user"];
export type AuthSession = Session["session"];
