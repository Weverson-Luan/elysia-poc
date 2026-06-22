import type { Context } from "elysia";

import {
  RuleAlreadyAssignedError,
  RuleAlreadyExistsError,
  RuleAssignmentNotFoundError,
  RuleNotFoundError,
} from "../entities/rule.errors";
import { resolveLocale } from "@/http/i18n/locale";
import { getMessages } from "@/http/i18n";
import { API_ERROR_CODES, buildApiError } from "@/http/types/api-error";

export function mapRuleErrorToHttp(
  error: unknown,
  set?: Context["set"],
  request?: Request,
) {
  const locale = resolveLocale(
    request?.headers.get("accept-language") ?? undefined,
  );
  const messages = getMessages(locale);

  if (error instanceof RuleAlreadyExistsError) {
    if (set) set.status = 409;
    return buildApiError(
      API_ERROR_CODES.RULE_ALREADY_EXISTS,
      messages.errors.ruleAlreadyExists,
    );
  }

  if (error instanceof RuleNotFoundError) {
    if (set) set.status = 404;
    return buildApiError(
      API_ERROR_CODES.RULE_NOT_FOUND,
      messages.errors.ruleNotFound,
    );
  }

  if (error instanceof RuleAlreadyAssignedError) {
    if (set) set.status = 400;
    return buildApiError(
      API_ERROR_CODES.RULE_ALREADY_ASSIGNED,
      messages.errors.ruleAlreadyAssigned,
    );
  }

  if (error instanceof RuleAssignmentNotFoundError) {
    if (set) set.status = 400;
    return buildApiError(
      API_ERROR_CODES.RULE_ASSIGNMENT_NOT_FOUND,
      messages.errors.ruleAssignmentNotFound,
    );
  }

  if (error instanceof Error) {
    if (set) set.status = 500;
    return buildApiError(
      API_ERROR_CODES.INTERNAL_SERVER_ERROR,
      messages.errors.internalServerError,
    );
  }

  if (set) set.status = 500;
  return buildApiError(
    API_ERROR_CODES.INTERNAL_SERVER_ERROR,
    messages.errors.internalServerError,
  );
}
