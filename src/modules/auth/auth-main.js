/**
 * IMPORTS
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, openAPI } from "better-auth/plugins";
// lib
import { prisma } from "../../lib/prisma";
/**
 * ============================================================================
 * AUTH MODULE
 * ============================================================================
 *
 * Centraliza toda a configuração de autenticação da aplicação utilizando
 * Better Auth como provedor principal.
 *
 * Responsabilidades:
 * - Configurar autenticação por e-mail e senha.
 * - Gerenciar sessões e tokens de acesso.
 * - Integrar autenticação com Prisma ORM.
 * - Configurar origens confiáveis (trusted origins).
 * - Expor documentação OpenAPI dos endpoints de autenticação.
 * - Disponibilizar tipagens compartilhadas de sessão e usuário.
 *
 * Tecnologias:
 * - Better Auth
 * - Prisma ORM
 * - PostgreSQL
 * - Bun Runtime
 *
 * @author Luan Sousa
 * @since 1.0.0
 */
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
let _schema;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());
const OpenAPI = {
    getPaths: (prefix = "/auth/api") => getSchema().then(({ paths }) => {
        const reference = Object.create(null);
        for (const path of Object.keys(paths)) {
            const key = prefix + path;
            reference[key] = paths[path];
            for (const method of Object.keys(paths[path])) {
                const operation = reference[key][method];
                operation.tags = ["Better Auth"];
            }
        }
        return reference;
    }),
    components: getSchema().then(({ components }) => components),
};
export { OpenAPI };
