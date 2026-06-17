import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.ENVIRONMENT === "DEV" ? ["error", "warn"] : ["error"],
  });

if (process.env.ENVIRONMENT !== "PROD") {
  globalForPrisma.prisma = prisma;
}
