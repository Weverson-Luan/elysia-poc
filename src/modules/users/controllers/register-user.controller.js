/**
 * IMPORTS
 */
// errors
import { mapUserErrorToHttp } from "../errors/http.error";
// typings
import { toCreateUserResponseDto, } from "../dtos/create-user.dto";
/**
 * Controlador para registrar um novo usuário
 * @param registerUserService - Serviço para registrar um novo usuário
 * @returns
 */
class RegisterUserController {
    constructor(registerUserService) {
        this.registerUserService = registerUserService;
    }
    async handle(body) {
        try {
            const user = await this.registerUserService.execute(body);
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
export { RegisterUserController };
