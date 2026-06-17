/**
 * IMPORTS
 */

// services
import { RegisterUserService } from "../services/register-user.service";

// errors
import { mapUserErrorToHttp } from "../errors/http.error";

// typings
import {
  toCreateUserResponseDto,
  type CreateUserRequestDto,
  type CreateUserResponseDto,
} from "../dtos/create-user.dto";

/**
 * Controlador para registrar um novo usuário
 * @param registerUserService - Serviço para registrar um novo usuário
 * @returns
 */
class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  async handle(body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    try {
      const user = await this.registerUserService.execute(body);
      return toCreateUserResponseDto(user);
    } catch (error) {
      mapUserErrorToHttp(error);
    }
  }
}

/**
 * EXPORTS
 */
export { RegisterUserController };
