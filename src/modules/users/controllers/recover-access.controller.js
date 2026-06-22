import { mapUserErrorToHttp } from "../errors/http.error";
import { toRecoverAccessResponseDto, } from "../dtos/recover-access.dto";
class RecoverAccessController {
    constructor(recoverAccessService) {
        this.recoverAccessService = recoverAccessService;
    }
    async handle(body) {
        try {
            await this.recoverAccessService.execute(body);
            return toRecoverAccessResponseDto();
        }
        catch (error) {
            mapUserErrorToHttp(error);
        }
    }
}
export { RecoverAccessController };
