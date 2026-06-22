/**
 * IMPORTS
 */
import { UserAlreadyExistsError } from "../entities/user.errors";
/**
 * Reponsável por criar um novo usuário com autenticação
 */
class AdminCreateUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ actorUserId, ...input }) {
        if (!actorUserId) {
            throw new Error("Actor user is required");
        }
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new UserAlreadyExistsError();
        }
        return this.userRepository.create(input);
    }
}
/**
 * EXPORTS
 */
export { AdminCreateUserService };
