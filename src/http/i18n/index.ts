import type { Locale } from "./locale";
import { en } from "./locales/en";
import { ptBR } from "./locales/pt-BR";

const dictionaries: Record<Locale, typeof ptBR> = {
  "pt-BR": ptBR,
  en,
};

export function getMessages(locale: Locale) {
  return dictionaries[locale];
}

export function formatMessage(
  template: string,
  params: Record<string, string | number>,
) {
  return Object.entries(params).reduce(
    (message, [key, value]) => message.replace(`{${key}}`, String(value)),
    template,
  );
}
