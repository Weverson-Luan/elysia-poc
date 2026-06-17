import type { PrismaClient } from "@prisma/client";

import type { UpdateUserInput } from "../entities/user.entity";
import type { IUpdateUserRepository } from "../contratos/update-user.repository.contract";
import { toUserEntity } from "./mappers/user.mapper";

class UpdateUserRepository implements IUpdateUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string, input: UpdateUserInput) {
    const data: { name?: string; phone?: string | null } = {};

    if (input.name !== undefined) {
      data.name = input.name;
    }

    if (input.phone !== undefined) {
      data.phone = input.phone;
    }

    if (Object.keys(data).length === 0) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      return user ? toUserEntity(user) : null;
    }

    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data,
      });

      return toUserEntity(user);
    } catch {
      return null;
    }
  }
}

export { UpdateUserRepository };
