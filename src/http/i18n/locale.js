export const DEFAULT_LOCALE = "pt-BR";
export function resolveLocale(acceptLanguage) {
    if (!acceptLanguage)
        return DEFAULT_LOCALE;
    const normalized = acceptLanguage.toLowerCase();
    if (normalized.includes("pt"))
        return "pt-BR";
    if (normalized.includes("en"))
        return "en";
    return DEFAULT_LOCALE;
}
