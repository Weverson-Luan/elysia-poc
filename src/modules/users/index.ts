/**
 * IMPORTS
 */

import { auth } from "../auth/auth-main";
import { prisma } from "../../lib/prisma";

// controllers
import { AdminCreateUserController } from "./controllers/admin-create-user.controller";
import { RegisterUserController } from "./controllers/register-user.controller";

// services
import { AdminCreateUserService } from "./services/admin-create-user.service";
import { RegisterUserService } from "./services/register-user.service";

// repositories
import { UserRepositoryImpl } from "./repositories/user.repository.impl";

// routes
import { createUserRoutes } from "./routes";
import { FindAllUsersUserService } from "./services/find-all-users.user.service";
import { FindAllUsersUserController } from "./controllers/find-all-users.user.controller";

export function createUsersModule() {
  const repository = new UserRepositoryImpl(auth, prisma);

  const registerService = new RegisterUserService(repository);
  const adminCreateService = new AdminCreateUserService(repository);
  const findAllUsersUserService = new FindAllUsersUserService(repository);

  const registerController = new RegisterUserController(registerService);

  const adminCreateController = new AdminCreateUserController(
    adminCreateService,
  );
  const findAllUsersUserController = new FindAllUsersUserController(
    findAllUsersUserService,
  );

  return createUserRoutes({
    registerController,
    adminCreateController,
    findAllUsersUserController,
  });
}
