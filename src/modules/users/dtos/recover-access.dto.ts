import { t } from "elysia";

export const recoverAccessBodySchema = t.Object({
  email: t.String({
    format: "email",
    error: "validation.fields.email.invalidEmail",
  }),
});

export type RecoverAccessRequestDto = typeof recoverAccessBodySchema.static;

export type RecoverAccessResponseDto = Record<string, never>;

export function toRecoverAccessResponseDto(): RecoverAccessResponseDto {
  return {};
}
