/**
 * IMPORTS
 */

import type { PrismaClient } from "@prisma/client";

// contrats
import type { IFindAllUserRepositoryContract } from "../contratos/find-all-user.repository.contract";

// mappers
import { toUserEntity } from "./mappers/user.mapper";
import { buildPaginatedData } from "../../../http/types/api-response";
import type { PaginationParams } from "../../../http/types/pagination";

/**
 * Repositório para buscar todos os usuários
 * @param prisma - Prisma Client
 * @returns
 */
class FindAllUsersRepository implements IFindAllUserRepositoryContract {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({ page, limit }: PaginationParams) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.user.count(),
    ]);

    return buildPaginatedData(
      users.map(toUserEntity),
      total,
      page,
      limit,
    );
  }
}

/**
 * EXPORTS
 */
export { FindAllUsersRepository };
