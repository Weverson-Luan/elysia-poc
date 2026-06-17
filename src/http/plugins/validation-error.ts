import { Elysia } from "elysia";
import { resolveLocale } from "../i18n/locale";
import { mapValidationErrors } from "../i18n/validation-message.mapper";
import type { ValidationErrorLike } from "../types/validation-error";

export const validationError = new Elysia({ name: "validation-error" }).onError(
  { as: "global" },
  ({ code, error, request, set }) => {
    if (code !== "VALIDATION") return;

    const locale = resolveLocale(
      request.headers.get("accept-language") ?? undefined,
    );
    const body = mapValidationErrors(error as ValidationErrorLike, locale);

    set.status = 422;
    return body;
  },
);
