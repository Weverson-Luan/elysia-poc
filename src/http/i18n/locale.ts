export type Locale = "pt-BR" | "en";

export type Messages = {
  validation: {
    failed: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    minLength: string;
    invalidType: string;
  };
  fields: Record<string, string>;
  errors: {
    userAlreadyExists: string;
    userNotFound: string;
    ruleAlreadyExists: string;
    ruleNotFound: string;
    ruleAlreadyAssigned: string;
    ruleAssignmentNotFound: string;
    invalidUserData: string;
    unauthorized: string;
    rateLimitExceeded: string;
    internalServerError: string;
  };
  success: {
    healthOk: string;
    userRegistered: string;
    userCreated: string;
    userProfile: string;
    userUpdated: string;
    usersList: string;
    credentialsSent: string;
    ruleCreated: string;
    rulesList: string;
    ruleReturned: string;
    ruleUpdated: string;
    ruleDeleted: string;
    ruleAssigned: string;
    ruleRevoked: string;
    userRulesReturned: string;
  };
};

export const DEFAULT_LOCALE: Locale = "pt-BR";

export function resolveLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const normalized = acceptLanguage.toLowerCase();

  if (normalized.includes("pt")) return "pt-BR";
  if (normalized.includes("en")) return "en";

  return DEFAULT_LOCALE;
}
