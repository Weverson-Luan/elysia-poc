/**
 * IMPORTS
 */
// mappers
import { toUserEntity } from "./mappers/user.mapper";
import { buildPaginatedData } from "../../../http/types/api-response";
/**
 * Repositório para buscar todos os usuários
 * @param prisma - Prisma Client
 * @returns
 */
class FindAllUsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute({ page, limit }) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            this.prisma.user.count(),
        ]);
        return buildPaginatedData(users.map(toUserEntity), total, page, limit);
    }
}
/**
 * EXPORTS
 */
export { FindAllUsersRepository };
