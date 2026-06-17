import { Elysia } from "elysia";

import { getMessages } from "../../../http/i18n";
import { resolveLocale } from "../../../http/i18n/locale";
import { buildApiSuccess } from "../../../http/types/api-response";
import { handleRouteError } from "../errors/http.error";
import type { RecoverAccessController } from "../controllers/recover-access.controller";
import { recoverAccessBodySchema } from "../dtos/recover-access.dto";

function createRecoverAccessRoute(
  recoverAccessController: RecoverAccessController,
) {
  return new Elysia({ name: "recover-access", prefix: "/users" }).post(
    "/recover-access",
    async ({ body, set, request }) => {
      try {
        const locale = resolveLocale(
          request.headers.get("accept-language") ?? undefined,
        );
        const messages = getMessages(locale);
        const data = await recoverAccessController.handle(body);
        set.status = 200;

        return buildApiSuccess(messages.success.credentialsSent, 200, data);
      } catch (error) {
        const locale = resolveLocale(
          request.headers.get("accept-language") ?? undefined,
        );
        return handleRouteError(error, { set, locale });
      }
    },
    { body: recoverAccessBodySchema },
  );
}

export { createRecoverAccessRoute };
