/**
 * IMPORTS
 */

import { auth } from "../auth/auth-main";
import { prisma } from "../../lib/prisma";

// controllers
import { AdminCreateUserController } from "./controllers/admin-create-user.controller";
import { RegisterUserController } from "./controllers/register-user.controller";
import { RecoverAccessController } from "./controllers/recover-access.controller";

// services
import { AdminCreateUserService } from "./services/admin-create-user.service";
import { RegisterUserService } from "./services/register-user.service";
import { RecoverAccessService } from "./services/recover-access.service";

// repositories
import { UserRepositoryImpl } from "./repositories/user.repository.impl";
import { ResetUserPasswordRepository } from "./repositories/reset-user-password.repository";

// routes
import { createUserRoutes } from "./routes";
import { FindAllUsersUserService } from "./services/find-all-users.user.service";
import { FindAllUsersUserController } from "./controllers/find-all-users.user.controller";

export function createUsersModule() {
  const repository = new UserRepositoryImpl(auth, prisma);
  const resetUserPasswordRepository = new ResetUserPasswordRepository(prisma);

  const registerService = new RegisterUserService(repository);
  const adminCreateService = new AdminCreateUserService(repository);
  const findAllUsersUserService = new FindAllUsersUserService(repository);
  const recoverAccessService = new RecoverAccessService(
    repository,
    resetUserPasswordRepository,
  );

  const registerController = new RegisterUserController(registerService);

  const adminCreateController = new AdminCreateUserController(
    adminCreateService,
  );
  const findAllUsersUserController = new FindAllUsersUserController(
    findAllUsersUserService,
  );
  const recoverAccessController = new RecoverAccessController(
    recoverAccessService,
  );

  return createUserRoutes({
    registerController,
    adminCreateController,
    findAllUsersUserController,
    recoverAccessController,
  });
}
