import { generateTemporaryPassword } from "@/lib/password-generator";
class RecoverAccessService {
    constructor(userRepository, resetUserPasswordRepository, notificationGateway) {
        this.userRepository = userRepository;
        this.resetUserPasswordRepository = resetUserPasswordRepository;
        this.notificationGateway = notificationGateway;
    }
    async execute({ email }) {
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
        await this.resetUserPasswordRepository.execute(user.id, user.email, temporaryPassword);
        if (!user.phone)
            return;
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
