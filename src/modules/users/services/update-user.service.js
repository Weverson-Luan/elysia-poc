import { UserNotFoundError } from "../entities/user.errors";
class UpdateUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId, input) {
        const user = await this.userRepository.update(userId, input);
        if (!user) {
            throw new UserNotFoundError();
        }
        return user;
    }
}
export { UpdateUserService };
