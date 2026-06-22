import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.ENVIRONMENT === "DEV" ? ["error", "warn"] : ["error"],
    });
if (process.env.ENVIRONMENT !== "PROD") {
    globalForPrisma.prisma = prisma;
}
