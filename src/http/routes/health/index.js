/**
 * IMPORTS
 */
import { Elysia } from "elysia";
import { getMessages } from "../../i18n";
import { resolveLocale } from "../../i18n/locale";
import { buildApiSuccess } from "../../types/api-response";
const health = new Elysia({ name: "health" }).get("/health", ({ request }) => {
    const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
    const messages = getMessages(locale);
    return buildApiSuccess(messages.success.healthOk, 200, {
        status: "ok",
    });
});
/**
 * EXPORTS
 */
export { health };
