/**
 * IMPORTS
 */
// mappers
import { toUserEntity } from "./mappers/user.mapper";
/**
 * Repositório para encontrar um usuário por email
 * @param prisma - Prisma Client
 * @returns
 */
class FindUserByEmailRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(email) {
        const user = await this.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (!user)
            return null;
        return toUserEntity(user);
    }
}
/**
 * EXPORTS
 */
export { FindUserByEmailRepository };
