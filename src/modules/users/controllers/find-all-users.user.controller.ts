/**
 * IMPORTS
 */

// entities
import type { User } from "../entities/user.entity";

// services
import { FindAllUsersUserService } from "../services/find-all-users.user.service";

// errors
import { mapUserErrorToHttp } from "../errors/http.error";

// types
import type { PaginatedData } from "../../../http/types/api-response";
import type { PaginationParams } from "../../../http/types/pagination";

/**
 * Controller responsável por buscar todos os usuários
 */
class FindAllUsersUserController {
  constructor(
    private readonly findAllUsersUserService: FindAllUsersUserService,
  ) {}

  async handle(params: PaginationParams): Promise<PaginatedData<User>> {
    try {
      return await this.findAllUsersUserService.execute(params);
    } catch (error) {
      mapUserErrorToHttp(error);
    }
  }
}

/**
 * EXPORTS
 */
export { FindAllUsersUserController };
