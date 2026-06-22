/**
 * IMPORTS
 */
import { t } from "elysia";
import { toUserResponseDto } from "./user-response.dto";
export const createUserBodySchema = t.Object({
    name: t.String({
        minLength: 1,
        error: "validation.fields.name.required",
    }),
    email: t.String({
        format: "email",
        error: "validation.fields.email.invalidEmail",
    }),
    password: t.String({
        minLength: 8,
        error: "validation.fields.password.minLength",
    }),
    phone: t.Optional(t.String({
        pattern: "^[0-9]{10,15}$",
        error: "validation.fields.phone.invalidPhone",
    })),
});
export function toCreateUserResponseDto(user) {
    return toUserResponseDto(user);
}
