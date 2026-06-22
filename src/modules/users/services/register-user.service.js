/**
 * IMPORTS
 */
import { UserAlreadyExistsError } from "../entities/user.errors";
/**
 * Reponsável por registrar um novo usuário sem autenticação
 */
class RegisterUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
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
export { RegisterUserService };
