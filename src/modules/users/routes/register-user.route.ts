/**
 * IMPORTS
 */

import { Elysia } from "elysia";

// controllers
import { RegisterUserController } from "../controllers/register-user.controller";

// errors
import { handleRouteError } from "../errors/http.error";

// i18n
import { getMessages } from "../../../http/i18n";
import { resolveLocale } from "../../../http/i18n/locale";

// types
import { buildApiSuccess } from "../../../http/types/api-response";

// typings
import { createUserBodySchema } from "../dtos/create-user.dto";

function createRegisterUserRoute(registerController: RegisterUserController) {
  return new Elysia({ name: "register-user", prefix: "/users" }).post(
    "/sign-up",
    async ({ body, set, request }) => {
      try {
        const locale = resolveLocale(
          request.headers.get("accept-language") ?? undefined,
        );
        const messages = getMessages(locale);
        const data = await registerController.handle(body);
        set.status = 201;

        return buildApiSuccess(messages.success.userRegistered, 201, data);
      } catch (error) {
        const locale = resolveLocale(
          request.headers.get("accept-language") ?? undefined,
        );
        return handleRouteError(error, { set, locale });
      }
    },
    { body: createUserBodySchema },
  );
}

/**
 * EXPORTS
 */
export { createRegisterUserRoute };
