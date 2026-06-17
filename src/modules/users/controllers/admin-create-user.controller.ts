/**
 * IMPORTS
 */

// services
import type { AdminCreateUserService } from "../services/admin-create-user.service";

// errors
import { mapUserErrorToHttp } from "../errors/http.error";

// typings
import {
  toCreateUserResponseDto,
  type CreateUserRequestDto,
  type CreateUserResponseDto,
} from "../dtos/create-user.dto";

/**
 * Controlador para criar um novo usuário com autenticação
 * @param adminCreateUserService - Serviço para criar um novo usuário com autenticação
 * @returns
 */
class AdminCreateUserController {
  constructor(
    private readonly adminCreateUserService: AdminCreateUserService,
  ) {}

  async handle(
    body: CreateUserRequestDto,
    actorUserId: string,
  ): Promise<CreateUserResponseDto> {
    try {
      const user = await this.adminCreateUserService.execute({
        ...body,
        actorUserId,
      });
      return toCreateUserResponseDto(user);
    } catch (error) {
      mapUserErrorToHttp(error);
    }
  }
}

/**
 * EXPORTS
 */
export { AdminCreateUserController };
