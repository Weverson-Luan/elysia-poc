/**
 * IMPORTS
 */
// Elysia
import { Elysia } from "elysia";
// auth macro
import { authMacro } from "../../http/plugins/auth-macro";
export { authMacro };
/**
 * Auth route para criar uma rota autenticada com Better Auth
 * @param name - Nome da rota
 * @param options - Opções da rota
 * @returns
 */
function createAuthRoute(name, options) {
    return new Elysia({ name, prefix: options?.prefix }).use(authMacro);
}
/**
 * EXPORTS
 */
export { createAuthRoute };
