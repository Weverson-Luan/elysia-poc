/**
 * IMPORTS
 */
// repositories
import { CreateUserRepository } from "./create-user.repository";
import { FindUserByEmailRepository } from "./find-user-by-email.repository";
import { FindAllUsersRepository } from "./find-all-users.repository";
import { UpdateUserRepository } from "./update-user.repository";
/**
 * Repositório para o usuário
 * @param auth - Autenticação
 * @param prisma - Prisma Client
 * @returns
 */
class UserRepositoryImpl {
    constructor(auth, prisma) {
        this.createUserRepository = new CreateUserRepository(auth, prisma);
        this.findUserByEmailRepository = new FindUserByEmailRepository(prisma);
        this.findAllUsersUserRepository = new FindAllUsersRepository(prisma);
        this.updateUserRepository = new UpdateUserRepository(prisma);
    }
    create(input) {
        return this.createUserRepository.execute(input);
    }
    findByEmail(email) {
        return this.findUserByEmailRepository.execute(email);
    }
    findAll(params) {
        return this.findAllUsersUserRepository.execute(params);
    }
    update(userId, input) {
        return this.updateUserRepository.execute(userId, input);
    }
}
/**
 * EXPORTS
 */
export { UserRepositoryImpl };
