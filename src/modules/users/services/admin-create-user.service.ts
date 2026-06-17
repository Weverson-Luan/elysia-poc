/**
 * IMPORTS
 */

// entities
import type { CreateUserInput, User } from "../entities/user.entity";
import { UserAlreadyExistsError } from "../entities/user.errors";

// repositories
import type { IUserRepository } from "../contratos/user.repository.contract";

export type AdminCreateUserInput = CreateUserInput & {
  actorUserId: string;
};

/**
 * Reponsável por criar um novo usuário com autenticação
 */
class AdminCreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    actorUserId,
    ...input
  }: AdminCreateUserInput): Promise<User> {
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
