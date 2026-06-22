/**
 * IMPORTS
 */
/**
 * Serviço responsável por buscar todos os usuários
 */
class FindAllUsersUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(params) {
        return this.userRepository.findAll(params);
    }
}
/**
 * EXPORTS
 */
export { FindAllUsersUserService };
