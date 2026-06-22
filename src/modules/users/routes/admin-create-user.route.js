/**
 * IMPORTS
 */
// auth
import { createAuthRoute } from "../auth";
// errors
import { handleRouteError } from "../errors/http.error";
// i18n
import { getMessages } from "../../../http/i18n";
import { resolveLocale } from "../../../http/i18n/locale";
// types
import { buildApiSuccess } from "../../../http/types/api-response";
// typings
import { createUserBodySchema } from "../dtos/create-user.dto";
/**
 * Rota para criar um novo usuário com autenticação
 * @param adminCreateController
 * @returns
 */
function createAdminCreateUserRoute(adminCreateController) {
    return createAuthRoute("admin-create-user", { prefix: "/users" }).post("/", async ({ body, user, set, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const data = await adminCreateController.handle(body, user.id);
            set.status = 201;
            return buildApiSuccess(messages.success.userCreated, 201, data);
        }
        catch (error) {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            return handleRouteError(error, { set, locale });
        }
    }, { body: createUserBodySchema, auth: true });
}
/**
 * EXPORTS
 */
export { createAdminCreateUserRoute };
