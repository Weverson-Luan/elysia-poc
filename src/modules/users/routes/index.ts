/**
 * IMPORTS
 */

import { Elysia } from "elysia";

// controllers
import { AdminCreateUserController } from "../controllers/admin-create-user.controller";
import { RegisterUserController } from "../controllers/register-user.controller";
import { FindAllUsersUserController } from "../controllers/find-all-users.user.controller";
import { RecoverAccessController } from "../controllers/recover-access.controller";

// routes
import { createAdminCreateUserRoute } from "./admin-create-user.route";
import { createGetMeRoute } from "./get-me.route";
import { createRegisterUserRoute } from "./register-user.route";
import { createFindAllUsersRoute } from "./find-all-users.route";
import { createRecoverAccessRoute } from "./recover-access.route";

type CreateUserRoutesDeps = {
  registerController: RegisterUserController;
  adminCreateController: AdminCreateUserController;
  findAllUsersUserController: FindAllUsersUserController;
  recoverAccessController: RecoverAccessController;
};

/**
 * Rota para criar as rotas de usuários
 * @param registerController - Controlador para registrar um novo usuário
 * @param adminCreateController - Controlador para criar um novo usuário com autenticação
 * @returns
 */
function createUserRoutes({
  registerController,
  adminCreateController,
  findAllUsersUserController,
  recoverAccessController,
}: CreateUserRoutesDeps) {
  return new Elysia({ name: "users" })
    .use(createRegisterUserRoute(registerController))
    .use(createRecoverAccessRoute(recoverAccessController))
    .use(createAdminCreateUserRoute(adminCreateController))
    .use(createFindAllUsersRoute(findAllUsersUserController))
    .use(createGetMeRoute());
}

/**
 * EXPORTS
 */
export { createUserRoutes };
