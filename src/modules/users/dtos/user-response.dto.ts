import type { User } from "../entities/user.entity";

export type UserResponseDto = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone: string | null;
  createdAt: string;
};

export function toUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    phone: user.phone,
    createdAt: user.createdAt.toISOString(),
  };
}
