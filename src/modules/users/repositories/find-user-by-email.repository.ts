/**
 * IMPORTS
 */

import type { PrismaClient } from "@prisma/client";

// entities
import type { User } from "../entities/user.entity";

// contrats
import type { IFindUserByEmailRepository } from "../contratos/find-user-by-email.repository.contract";

// mappers
import { toUserEntity } from "./mappers/user.mapper";

/**
 * Repositório para encontrar um usuário por email
 * @param prisma - Prisma Client
 * @returns
 */
class FindUserByEmailRepository implements IFindUserByEmailRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) return null;

    return toUserEntity(user);
  }
}

/**
 * EXPORTS
 */
export { FindUserByEmailRepository };
