/**
 * IMPORTS
 */

import type { User } from "../entities/user.entity";

interface IFindUserByEmailRepository {
  execute(email: string): Promise<User | null>;
}

/**
 * EXPORTS
 */
export { IFindUserByEmailRepository };
