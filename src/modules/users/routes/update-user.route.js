import { createAuthRoute } from "../auth";
import { handleRouteError } from "../errors/http.error";
import { getMessages } from "../../../http/i18n";
import { resolveLocale } from "../../../http/i18n/locale";
import { buildApiSuccess } from "../../../http/types/api-response";
import { updateUserBodySchema } from "../dtos/update-user.dto";
function createUpdateUserRoute(updateUserController) {
    return createAuthRoute("update-me").patch("/update-me", async ({ body, user, set, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const data = await updateUserController.handle(body, user.id);
            set.status = 200;
            return buildApiSuccess(messages.success.userUpdated, 200, data);
        }
        catch (error) {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            return handleRouteError(error, { set, locale });
        }
    }, { body: updateUserBodySchema, auth: true });
}
export { createUpdateUserRoute };
