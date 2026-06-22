import { t } from "elysia";
import { toUserResponseDto } from "./user-response.dto";
export const updateUserBodySchema = t.Object({
    name: t.Optional(t.String({
        minLength: 1,
        error: "validation.fields.name.required",
    })),
    phone: t.Optional(t.Union([
        t.String({
            pattern: "^[0-9]{10,15}$",
            error: "validation.fields.phone.invalidPhone",
        }),
        t.Null(),
    ])),
});
export function toUpdateUserResponseDto(user) {
    return toUserResponseDto(user);
}
