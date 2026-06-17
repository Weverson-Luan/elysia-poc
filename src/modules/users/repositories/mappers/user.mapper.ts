import type { User } from "../../entities/user.entity";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
};

export function toUserEntity(record: UserRecord): User {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    emailVerified: record.emailVerified,
    createdAt: record.createdAt,
  };
}
