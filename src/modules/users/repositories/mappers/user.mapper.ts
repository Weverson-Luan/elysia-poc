import type { User } from "../../entities/user.entity";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone?: string | null;
  createdAt: Date;
};

export function toUserEntity(record: UserRecord): User {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    emailVerified: record.emailVerified,
    phone: record.phone ?? null,
    createdAt: record.createdAt,
  };
}
