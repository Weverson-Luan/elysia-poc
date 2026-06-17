import type { UpdateUserInput, User } from "../entities/user.entity";

interface IUpdateUserRepository {
  execute(userId: string, input: UpdateUserInput): Promise<User | null>;
}

export type { IUpdateUserRepository };
