import { t } from "elysia";
export const recoverAccessBodySchema = t.Object({
    email: t.String({
        format: "email",
        error: "validation.fields.email.invalidEmail",
    }),
});
export function toRecoverAccessResponseDto() {
    return {};
}
