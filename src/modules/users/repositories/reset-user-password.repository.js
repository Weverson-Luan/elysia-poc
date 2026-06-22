import { generateRandomString, hashPassword } from "better-auth/crypto";
const CREDENTIAL_PROVIDER_ID = "credential";
class ResetUserPasswordRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(userId, email, newPassword) {
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
