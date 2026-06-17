import { mapUserErrorToHttp } from "../errors/http.error";
import type { UpdateUserService } from "../services/update-user.service";
import {
  toUpdateUserResponseDto,
  type UpdateUserRequestDto,
  type UpdateUserResponseDto,
} from "../dtos/update-user.dto";

class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  async handle(
    body: UpdateUserRequestDto,
    userId: string,
  ): Promise<UpdateUserResponseDto> {
    try {
      const user = await this.updateUserService.execute(userId, body);
      return toUpdateUserResponseDto(user);
    } catch (error) {
      mapUserErrorToHttp(error);
    }
  }
}

export { UpdateUserController };
