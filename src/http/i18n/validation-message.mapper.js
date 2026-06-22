import { API_ERROR_CODES, buildApiError, VALIDATION_DETAIL_CODES, } from "../types/api-error";
import { formatMessage, getMessages } from "./index";
function getFieldLabel(field, locale) {
    const messages = getMessages(locale);
    return messages.fields[field] ?? field;
}
function getFieldFromPath(path) {
    return path.replace(/^\//, "");
}
function isMissingValue(issue) {
    const summary = issue.summary?.toLowerCase() ?? "";
    const message = issue.message?.toLowerCase() ?? "";
    return (summary.includes("is missing") ||
        summary.includes("undefined") ||
        message.includes("undefined") ||
        (typeof issue.message === "string" && issue.message.endsWith(".required")));
}
function resolveIssueMessage(issue, locale) {
    const messages = getMessages(locale);
    const field = getFieldFromPath(issue.path);
    const fieldLabel = getFieldLabel(field, locale);
    const schema = (issue.schema ?? {});
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
export function mapValidationErrors(error, locale) {
    const messages = getMessages(locale);
    const details = error.all.map((issue) => {
        const resolved = resolveIssueMessage(issue, locale);
        return {
            field: getFieldFromPath(issue.path),
            code: resolved.code,
            message: resolved.message,
        };
    });
    const uniqueDetails = details.filter((detail, index, list) => list.findIndex((item) => item.field === detail.field) === index);
    return buildApiError(API_ERROR_CODES.VALIDATION_FAILED, messages.validation.failed, uniqueDetails);
}
