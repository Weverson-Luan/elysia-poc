import { t } from "elysia";

import type { User } from "../entities/user.entity";
import { toUserResponseDto, type UserResponseDto } from "./user-response.dto";

export const updateUserBodySchema = t.Object({
  name: t.Optional(
    t.String({
      minLength: 1,
      error: "validation.fields.name.required",
    }),
  ),
  phone: t.Optional(
    t.Union([
      t.String({
        pattern: "^[0-9]{10,15}$",
        error: "validation.fields.phone.invalidPhone",
      }),
      t.Null(),
    ]),
  ),
});

export type UpdateUserRequestDto = typeof updateUserBodySchema.static;

export type UpdateUserResponseDto = UserResponseDto;

export function toUpdateUserResponseDto(user: User): UpdateUserResponseDto {
  return toUserResponseDto(user);
}
