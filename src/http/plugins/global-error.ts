import { Elysia } from "elysia";
import { getMessages } from "../i18n";
import { resolveLocale } from "../i18n/locale";
import { API_ERROR_CODES, buildApiError } from "../types/api-error";

export const globalError = new Elysia({ name: "global-error" }).onError(
  { as: "global" },
  ({ code, error, request, set }) => {
    if (code === "VALIDATION") return;

    const locale = resolveLocale(
      request.headers.get("accept-language") ?? undefined,
    );
    const messages = getMessages(locale);

    console.error(error);

    set.status = 500;
    return buildApiError(
      API_ERROR_CODES.INTERNAL_SERVER_ERROR,
      messages.errors.internalServerError,
    );
  },
);
