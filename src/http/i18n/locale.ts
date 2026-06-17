export type Locale = "pt-BR" | "en";

export type Messages = {
  validation: {
    failed: string;
    required: string;
    invalidEmail: string;
    minLength: string;
    invalidType: string;
  };
  fields: Record<string, string>;
  errors: {
    userAlreadyExists: string;
    invalidUserData: string;
    unauthorized: string;
    internalServerError: string;
  };
  success: {
    healthOk: string;
    userRegistered: string;
    userCreated: string;
    userProfile: string;
    usersList: string;
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
