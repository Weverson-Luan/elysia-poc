export const API_ERROR_CODES = {
  VALIDATION_FAILED: "VALIDATION_FAILED",
  INVALID_USER_DATA: "INVALID_USER_DATA",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  UNAUTHORIZED: "UNAUTHORIZED",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export const VALIDATION_DETAIL_CODES = {
  REQUIRED: "REQUIRED",
  INVALID_EMAIL: "INVALID_EMAIL",
  MIN_LENGTH: "MIN_LENGTH",
  INVALID_TYPE: "INVALID_TYPE",
} as const;

export type ApiErrorDetail = {
  field?: string;
  code: string;
  message: string;
};

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
};

export function buildApiError(
  code: string,
  message: string,
  details?: ApiErrorDetail[],
): ApiErrorBody {
  return {
    error: {
      code,
      message,
      ...(details?.length ? { details } : {}),
    },
  };
}
