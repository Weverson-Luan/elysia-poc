import { en } from "./locales/en";
import { ptBR } from "./locales/pt-BR";
const dictionaries = {
    "pt-BR": ptBR,
    en,
};
export function getMessages(locale) {
    return dictionaries[locale];
}
export function formatMessage(template, params) {
    return Object.entries(params).reduce((message, [key, value]) => message.replace(`{${key}}`, String(value)), template);
}
