/**
 * IMPORTS
 */

// auth
import type { auth } from "@/modules/auth/auth-main";

// entities
import type {
  CreateUserInput,
  User,
} from "@/modules/users/entities/user.entity";

// contrats
import type { ICreateUserRepository } from "@/modules/users/contratos/create-user.repository.contract";

// mappers
import { mapAuthError } from "./mappers/auth-error.mapper";
import { toUserEntity } from "./mappers/user.mapper";

type Auth = typeof auth;

/**
 * Repositório para criar um novo usuário
 * @param auth - Autenticação
 * @returns
 */
class CreateUserRepository implements ICreateUserRepository {
  constructor(private readonly auth: Auth) {}

  async execute(input: CreateUserInput): Promise<User> {
    try {
      const result = await this.auth.api.signUpEmail({
        body: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });

      return toUserEntity(result.user);
    } catch (error) {
      throw mapAuthError(error);
    }
  }
}

/**
 * EXPORTS
 */
export { CreateUserRepository };
