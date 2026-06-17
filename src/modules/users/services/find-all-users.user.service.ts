/**
 * IMPORTS
 */

// repositories
import type { IUserRepository } from "../contratos/user.repository.contract";
import type { PaginatedData } from "../../../http/types/api-response";
import type { PaginationParams } from "../../../http/types/pagination";
import type { User } from "../entities/user.entity";

/**
 * Serviço responsável por buscar todos os usuários
 */
class FindAllUsersUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: PaginationParams): Promise<PaginatedData<User>> {
    return this.userRepository.findAll(params);
  }
}

/**
 * EXPORTS
 */
export { FindAllUsersUserService };
