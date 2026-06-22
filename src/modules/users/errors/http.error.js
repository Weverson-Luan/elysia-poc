import { API_ERROR_CODES, buildApiError, } from "../../../http/types/api-error";
import { getMessages } from "../../../http/i18n";
import { DEFAULT_LOCALE } from "../../../http/i18n/locale";
import { InvalidUserDataError, RateLimitExceededError, UserAlreadyExistsError, UserNotFoundError, } from "../entities/user.errors";
export class HttpError extends Error {
    constructor(status, code, message, details) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
        this.name = "HttpError";
    }
}
export function resolveHttpErrorMessage(code, locale, fallback) {
    const messages = getMessages(locale);
    switch (code) {
        case API_ERROR_CODES.USER_ALREADY_EXISTS:
            return messages.errors.userAlreadyExists;
        case API_ERROR_CODES.USER_NOT_FOUND:
            return messages.errors.userNotFound;
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
export function mapUserErrorToHttp(error) {
    if (error instanceof UserAlreadyExistsError) {
        throw new HttpError(409, API_ERROR_CODES.USER_ALREADY_EXISTS, "");
    }
    if (error instanceof UserNotFoundError) {
        throw new HttpError(404, API_ERROR_CODES.USER_NOT_FOUND, "");
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
export function handleRouteError(error, { set, locale }) {
    const resolvedLocale = locale ?? DEFAULT_LOCALE;
    if (error instanceof HttpError) {
        set.status = error.status;
        const message = error.message ||
            resolveHttpErrorMessage(error.code, resolvedLocale, error.message);
        return buildApiError(error.code, message, error.details);
    }
    set.status = 500;
    return buildApiError(API_ERROR_CODES.INTERNAL_SERVER_ERROR, resolveHttpErrorMessage(API_ERROR_CODES.INTERNAL_SERVER_ERROR, resolvedLocale));
}
