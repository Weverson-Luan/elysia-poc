/**
 * IMPORTS
 */

// repositories
import type { IUserRepository } from "../contratos/user.repository.contract";

// entities errors
import type { CreateUserInput, User } from "../entities/user.entity";
import { UserAlreadyExistsError } from "../entities/user.errors";

/**
 * Reponsável por registrar um novo usuário sem autenticação
 */
class RegisterUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
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
