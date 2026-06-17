import type { IUserRepository } from "../contratos/user.repository.contract";
import type { UpdateUserInput, User } from "../entities/user.entity";
import { UserNotFoundError } from "../entities/user.errors";

class UpdateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, input: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.update(userId, input);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}

export { UpdateUserService };
