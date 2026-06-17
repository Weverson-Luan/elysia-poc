/**
 * IMPORTS
 */

import type { CreateUserInput, User } from "../entities/user.entity";

interface ICreateUserRepository {
  execute(input: CreateUserInput): Promise<User>;
}

/**
 * EXPORTS
 */
export { ICreateUserRepository };
