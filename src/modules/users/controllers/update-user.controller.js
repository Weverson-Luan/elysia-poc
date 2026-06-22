import { mapUserErrorToHttp } from "../errors/http.error";
import { toUpdateUserResponseDto, } from "../dtos/update-user.dto";
class UpdateUserController {
    constructor(updateUserService) {
        this.updateUserService = updateUserService;
    }
    async handle(body, userId) {
        try {
            const user = await this.updateUserService.execute(userId, body);
            return toUpdateUserResponseDto(user);
        }
        catch (error) {
            mapUserErrorToHttp(error);
        }
    }
}
export { UpdateUserController };
