import type { Context } from "elysia";
import {
  API_ERROR_CODES,
  buildApiError,
  type ApiErrorDetail,
} from "../../../http/types/api-error";
import { getMessages } from "../../../http/i18n";
import { DEFAULT_LOCALE, type Locale } from "../../../http/i18n/locale";
import {
  InvalidUserDataError,
  RateLimitExceededError,
  UserAlreadyExistsError,
} from "../entities/user.errors";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: ApiErrorDetail[],
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export function resolveHttpErrorMessage(
  code: string,
  locale: Locale,
  fallback?: string,
): string {
  const messages = getMessages(locale);

  switch (code) {
    case API_ERROR_CODES.USER_ALREADY_EXISTS:
      return messages.errors.userAlreadyExists;
    case API_ERROR_CODES.INVALID_USER_DATA:
      return fallback ?? messages.errors.invalidUserData;
    case API_ERROR_CODES.UNAUTHORIZED:
      return messages.errors.unauthorized;
    case API_ERROR_CODES.RATE_LIMIT_EXCEEDED:
      return messages.errors.rateLimitExceeded;
    case API_ERROR_CODES.INTERNAL_SERVER_ERROR:
      return messages.errors.internalServerError;
    default:
      return fallback ?? messages.errors.internalServerError;
  }
}

export function mapUserErrorToHttp(error: unknown): never {
  if (error instanceof UserAlreadyExistsError) {
    throw new HttpError(409, API_ERROR_CODES.USER_ALREADY_EXISTS, "");
  }

  if (error instanceof InvalidUserDataError) {
    throw new HttpError(400, API_ERROR_CODES.INVALID_USER_DATA, error.message);
  }

  if (error instanceof RateLimitExceededError) {
    throw new HttpError(429, API_ERROR_CODES.RATE_LIMIT_EXCEEDED, "");
  }

  if (error instanceof HttpError) {
    throw error;
  }

  throw new HttpError(500, API_ERROR_CODES.INTERNAL_SERVER_ERROR, "");
}

type RouteContext = Pick<Context, "set"> & {
  locale?: Locale;
};

export function handleRouteError(error: unknown, { set, locale }: RouteContext) {
  const resolvedLocale = locale ?? DEFAULT_LOCALE;

  if (error instanceof HttpError) {
    set.status = error.status;
    const message =
      error.message ||
      resolveHttpErrorMessage(error.code, resolvedLocale, error.message);

    return buildApiError(error.code, message, error.details);
  }

  set.status = 500;
  return buildApiError(
    API_ERROR_CODES.INTERNAL_SERVER_ERROR,
    resolveHttpErrorMessage(
      API_ERROR_CODES.INTERNAL_SERVER_ERROR,
      resolvedLocale,
    ),
  );
}
