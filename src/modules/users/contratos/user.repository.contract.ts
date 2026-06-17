/**
 * IMPORTS
 */

import type { CreateUserInput, User } from "../entities/user.entity";
import type { PaginatedData } from "../../../http/types/api-response";
import type { PaginationParams } from "../../../http/types/pagination";

/**
 * Interface para o repositório de usuários
 * @param input - Input para criar um usuário
 * @param email - Email para encontrar um usuário
 * @returns
 */
interface IUserRepository {
  create(input: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(params: PaginationParams): Promise<PaginatedData<User>>;
}

/**
 * EXPORTS
 */
export { IUserRepository };
