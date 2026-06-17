/**
 * IMPORTS
 */

// auth
import { createAuthRoute } from "../auth";

// i18n
import { getMessages } from "../../../http/i18n";
import { resolveLocale } from "../../../http/i18n/locale";

// types
import { buildApiSuccess } from "../../../http/types/api-response";

// dtos
import { toUserResponseDto } from "../dtos/user-response.dto";

/**
 * Rota para obter o usuário autenticado
 * @returns
 */
function createGetMeRoute() {
  return createAuthRoute("get-me").get(
    "/me",
    ({ user, request }) => {
      const locale = resolveLocale(
        request.headers.get("accept-language") ?? undefined,
      );
      const messages = getMessages(locale);

      return buildApiSuccess(
        messages.success.userProfile,
        200,
        toUserResponseDto({
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          createdAt: new Date(user.createdAt),
        }),
      );
    },
    {
      auth: true,
    },
  );
}

/**
 * EXPORTS
 */
export { createGetMeRoute };
