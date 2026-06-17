import { Elysia } from "elysia";
import { auth } from "../../modules/auth/auth-main";
import { getMessages } from "../i18n";
import { resolveLocale } from "../i18n/locale";
import { API_ERROR_CODES, buildApiError } from "../types/api-error";

export const authMacro = new Elysia({ name: "auth-macro" }).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({ headers });

      if (!session) {
        const locale = resolveLocale(
          headers.get("accept-language") ?? undefined,
        );
        const messages = getMessages(locale);

        return status(
          401,
          buildApiError(
            API_ERROR_CODES.UNAUTHORIZED,
            messages.errors.unauthorized,
          ),
        );
      }

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});
