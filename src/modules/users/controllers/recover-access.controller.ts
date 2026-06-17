import type { RecoverAccessService } from "../services/recover-access.service";
import { mapUserErrorToHttp } from "../errors/http.error";
import {
  toRecoverAccessResponseDto,
  type RecoverAccessRequestDto,
  type RecoverAccessResponseDto,
} from "../dtos/recover-access.dto";

class RecoverAccessController {
  constructor(private readonly recoverAccessService: RecoverAccessService) {}

  async handle(
    body: RecoverAccessRequestDto,
  ): Promise<RecoverAccessResponseDto> {
    try {
      await this.recoverAccessService.execute(body);
      return toRecoverAccessResponseDto();
    } catch (error) {
      mapUserErrorToHttp(error);
    }
  }
}

export { RecoverAccessController };
