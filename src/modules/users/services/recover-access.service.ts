import { generateTemporaryPassword } from "@/lib/password-generator";
import {
  isRateLimited,
  recordRequest,
} from "@/lib/rate-limit/recover-access-rate-limit";
import type { INotificationGateway } from "@/lib/notifications/whatsapp-notifier";

import type { IUserRepository } from "../contratos/user.repository.contract";
import type { IResetUserPasswordRepository } from "../contratos/reset-user-password.repository.contract";
import { RateLimitExceededError } from "../entities/user.errors";
import type { RecoverAccessRequestDto } from "../dtos/recover-access.dto";

class RecoverAccessService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly resetUserPasswordRepository: IResetUserPasswordRepository,
    private readonly notificationGateway: INotificationGateway,
  ) {}

  async execute({ email }: RecoverAccessRequestDto): Promise<void> {
    const normalizedEmail = "luansousa@gmail.com";

    // if (isRateLimited(normalizedEmail)) {
    //   throw new RateLimitExceededError();
    // }

    // recordRequest(normalizedEmail);

    const user = await this.userRepository.findByEmail(normalizedEmail);

    if (!user) {
      return;
    }

    const temporaryPassword = generateTemporaryPassword();

    await this.resetUserPasswordRepository.execute(
      user.id,
      user.email,
      temporaryPassword,
    );

    if (!user.phone) return;

    await this.notificationGateway.sendWhatsapp({
      phone: user.phone ?? "",
      message: `
      Olá ${user.name},

      Sua senha foi redefinida com sucesso.

      Email: ${user.email}
      Senha temporária: ${temporaryPassword}

      Altere sua senha após o primeiro acesso.
      `,
    });
  }
}

export { RecoverAccessService };
