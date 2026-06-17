/**
 * IMPORTS
 */

// auth
import { createAuthRoute } from "../auth";
import { FindAllUsersUserController } from "../controllers/find-all-users.user.controller";
import { toUserResponseDto } from "../dtos/user-response.dto";
import { mapUserErrorToHttp } from "../errors/http.error";

// i18n
import { getMessages } from "../../../http/i18n";
import { resolveLocale } from "../../../http/i18n/locale";

// types
import { buildApiSuccess } from "../../../http/types/api-response";
import {
  paginationQuerySchema,
  toPaginationParams,
} from "../../../http/types/pagination";

/**
 * Rota para listar usuários com paginação
 * @returns
 */
function createFindAllUsersRoute(
  findAllUsersUserController: FindAllUsersUserController,
) {
  return createAuthRoute("find-all-users").get(
    "/find-all-users",
    async ({ query, request }) => {
      try {
        const locale = resolveLocale(
          request.headers.get("accept-language") ?? undefined,
        );
        const messages = getMessages(locale);
        const result = await findAllUsersUserController.handle(
          toPaginationParams(query),
        );

        return buildApiSuccess(messages.success.usersList, 200, {
          total: result.total,
          totalPages: result.totalPages,
          page: result.page,
          limit: result.limit,
          items: result.items.map(toUserResponseDto),
        });
      } catch (error) {
        mapUserErrorToHttp(error);
      }
    },
    {
      auth: true,
      query: paginationQuerySchema,
    },
  );
}

/**
 * EXPORTS
 */
export { createFindAllUsersRoute };
