/**
 * IMPORTS
 */

import type { PrismaClient } from "@prisma/client";

// auth
import { auth } from "../../../auth";

// repositories
import { CreateUserRepository } from "./create-user.repository";
import { FindUserByEmailRepository } from "./find-user-by-email.repository";
import { FindAllUsersRepository } from "./find-all-users.repository";

// entities
import type { CreateUserInput, User } from "../entities/user.entity";
import type { PaginatedData } from "../../../http/types/api-response";
import type { PaginationParams } from "../../../http/types/pagination";

// contrats
import type { IUserRepository } from "../contratos/user.repository.contract";

type Auth = typeof auth;

/**
 * Repositório para o usuário
 * @param auth - Autenticação
 * @param prisma - Prisma Client
 * @returns
 */
class UserRepositoryImpl implements IUserRepository {
  private readonly createUserRepository: CreateUserRepository;
  private readonly findUserByEmailRepository: FindUserByEmailRepository;
  private readonly findAllUsersUserRepository: FindAllUsersRepository;

  constructor(auth: Auth, prisma: PrismaClient) {
    this.createUserRepository = new CreateUserRepository(auth);
    this.findUserByEmailRepository = new FindUserByEmailRepository(prisma);
    this.findAllUsersUserRepository = new FindAllUsersRepository(prisma);
  }

  create(input: CreateUserInput): Promise<User> {
    return this.createUserRepository.execute(input);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.findUserByEmailRepository.execute(email);
  }

  findAll(params: PaginationParams): Promise<PaginatedData<User>> {
    return this.findAllUsersUserRepository.execute(params);
  }
}

/**
 * EXPORTS
 */
export { UserRepositoryImpl };
