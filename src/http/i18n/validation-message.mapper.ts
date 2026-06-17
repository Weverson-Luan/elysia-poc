import type { ValidationErrorLike } from "../types/validation-error";
import {
  API_ERROR_CODES,
  buildApiError,
  VALIDATION_DETAIL_CODES,
  type ApiErrorBody,
  type ApiErrorDetail,
} from "../types/api-error";
import type { Locale } from "./locale";
import { formatMessage, getMessages } from "./index";

type ValidationIssue = ValidationErrorLike["all"][number];

type ResolvedIssue = {
  code: string;
  message: string;
};

type SchemaHint = {
  format?: string;
  minLength?: number;
  type?: string;
};

function getFieldLabel(field: string, locale: Locale) {
  const messages = getMessages(locale);
  return messages.fields[field] ?? field;
}

function getFieldFromPath(path: string) {
  return path.replace(/^\//, "");
}

function isMissingValue(issue: ValidationIssue) {
  const summary = issue.summary?.toLowerCase() ?? "";
  const message = issue.message?.toLowerCase() ?? "";

  return (
    summary.includes("is missing") ||
    summary.includes("undefined") ||
    message.includes("undefined") ||
    (typeof issue.message === "string" && issue.message.endsWith(".required"))
  );
}

function resolveIssueMessage(issue: ValidationIssue, locale: Locale): ResolvedIssue {
  const messages = getMessages(locale);
  const field = getFieldFromPath(issue.path);
  const fieldLabel = getFieldLabel(field, locale);
  const schema = (issue.schema ?? {}) as SchemaHint;

  if (typeof issue.message === "string" && issue.message.startsWith("validation.")) {
    const key = issue.message.replace("validation.", "");
    const fieldKey = `fields.${field}`;

    if (key === `${fieldKey}.required`) {
      return {
        code: VALIDATION_DETAIL_CODES.REQUIRED,
        message: formatMessage(messages.validation.required, { field: fieldLabel }),
      };
    }

    if (key === `${fieldKey}.invalidEmail`) {
      return {
        code: VALIDATION_DETAIL_CODES.INVALID_EMAIL,
        message: messages.validation.invalidEmail,
      };
    }

    if (key === `${fieldKey}.minLength`) {
      return {
        code: VALIDATION_DETAIL_CODES.MIN_LENGTH,
        message: formatMessage(messages.validation.minLength, {
          field: fieldLabel,
          min: schema.minLength ?? 8,
        }),
      };
    }
  }

  if (schema.format === "email") {
    return {
      code: VALIDATION_DETAIL_CODES.INVALID_EMAIL,
      message: messages.validation.invalidEmail,
    };
  }

  if (schema.minLength && !isMissingValue(issue)) {
    return {
      code: VALIDATION_DETAIL_CODES.MIN_LENGTH,
      message: formatMessage(messages.validation.minLength, {
        field: fieldLabel,
        min: schema.minLength,
      }),
    };
  }

  if (isMissingValue(issue)) {
    return {
      code: VALIDATION_DETAIL_CODES.REQUIRED,
      message: formatMessage(messages.validation.required, { field: fieldLabel }),
    };
  }

  return {
    code: VALIDATION_DETAIL_CODES.INVALID_TYPE,
    message: formatMessage(messages.validation.invalidType, { field: fieldLabel }),
  };
}

export function mapValidationErrors(
  error: ValidationErrorLike,
  locale: Locale,
): ApiErrorBody {
  const messages = getMessages(locale);
  const details: ApiErrorDetail[] = error.all.map((issue) => {
    const resolved = resolveIssueMessage(issue, locale);

    return {
      field: getFieldFromPath(issue.path),
      code: resolved.code,
      message: resolved.message,
    };
  });

  const uniqueDetails = details.filter(
    (detail, index, list) =>
      list.findIndex((item) => item.field === detail.field) === index,
  );

  return buildApiError(
    API_ERROR_CODES.VALIDATION_FAILED,
    messages.validation.failed,
    uniqueDetails,
  );
}
