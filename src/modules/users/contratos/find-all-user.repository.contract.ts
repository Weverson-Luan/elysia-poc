/**
 * IMPORTS
 */

import type { User } from "../entities/user.entity";
import type { PaginatedData } from "../../../http/types/api-response";
import type { PaginationParams } from "../../../http/types/pagination";

interface IFindAllUserRepositoryContract {
  execute(params: PaginationParams): Promise<PaginatedData<User>>;
}

/**
 * EXPORTS
 */
export { IFindAllUserRepositoryContract };
