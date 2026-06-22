/**
 * IMPORTS
 */
// errors
import { mapUserErrorToHttp } from "../errors/http.error";
// typings
import { toCreateUserResponseDto, } from "../dtos/create-user.dto";
/**
 * Controlador para criar um novo usuário com autenticação
 * @param adminCreateUserService - Serviço para criar um novo usuário com autenticação
 * @returns
 */
class AdminCreateUserController {
    constructor(adminCreateUserService) {
        this.adminCreateUserService = adminCreateUserService;
    }
    async handle(body, actorUserId) {
        try {
            const user = await this.adminCreateUserService.execute({
                ...body,
                actorUserId,
            });
            return toCreateUserResponseDto(user);
        }
        catch (error) {
            mapUserErrorToHttp(error);
        }
    }
}
/**
 * EXPORTS
 */
export { AdminCreateUserController };
