/**
 * IMPORTS
 */
// mappers
import { mapAuthError } from "./mappers/auth-error.mapper";
import { toUserEntity } from "./mappers/user.mapper";
/**
 * Repositório para criar um novo usuário
 * @param auth - Autenticação
 * @param prisma - Prisma Client
 * @returns
 */
class CreateUserRepository {
    constructor(auth, prisma) {
        this.auth = auth;
        this.prisma = prisma;
    }
    async execute(input) {
        try {
            const result = await this.auth.api.signUpEmail({
                body: {
                    name: input.name,
                    email: input.email,
                    password: input.password,
                },
            });
            if (input.phone) {
                const updated = await this.prisma.user.update({
                    where: { id: result.user.id },
                    data: { phone: input.phone },
                });
                return toUserEntity(updated);
            }
            return toUserEntity(result.user);
        }
        catch (error) {
            throw mapAuthError(error);
        }
    }
}
/**
 * EXPORTS
 */
export { CreateUserRepository };
