import type { PrismaClient } from "@prisma/client";
import { generateRandomString, hashPassword } from "better-auth/crypto";

import type { IResetUserPasswordRepository } from "../contratos/reset-user-password.repository.contract";

const CREDENTIAL_PROVIDER_ID = "credential";

class ResetUserPasswordRepository implements IResetUserPasswordRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(
    userId: string,
    email: string,
    newPassword: string,
  ): Promise<void> {
    const hashedPassword = await hashPassword(newPassword);

    const existingAccount = await this.prisma.account.findFirst({
      where: {
        userId,
        providerId: CREDENTIAL_PROVIDER_ID,
      },
    });

    if (existingAccount) {
      await this.prisma.account.update({
        where: { id: existingAccount.id },
        data: { password: hashedPassword },
      });
      return;
    }

    await this.prisma.account.create({
      data: {
        id: generateRandomString(32),
        accountId: email,
        providerId: CREDENTIAL_PROVIDER_ID,
        userId,
        password: hashedPassword,
      },
    });
  }
}

export { ResetUserPasswordRepository };
