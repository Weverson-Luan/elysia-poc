/**
 * IMPORTS
 */
// errors
import { mapUserErrorToHttp } from "../errors/http.error";
/**
 * Controller responsável por buscar todos os usuários
 */
class FindAllUsersUserController {
    constructor(findAllUsersUserService) {
        this.findAllUsersUserService = findAllUsersUserService;
    }
    async handle(params) {
        try {
            return await this.findAllUsersUserService.execute(params);
        }
        catch (error) {
            mapUserErrorToHttp(error);
        }
    }
}
/**
 * EXPORTS
 */
export { FindAllUsersUserController };
