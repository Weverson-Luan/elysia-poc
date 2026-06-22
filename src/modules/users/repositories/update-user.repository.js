import { toUserEntity } from "./mappers/user.mapper";
class UpdateUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(userId, input) {
        const data = {};
        if (input.name !== undefined) {
            data.name = input.name;
        }
        if (input.phone !== undefined) {
            data.phone = input.phone;
        }
        if (Object.keys(data).length === 0) {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            return user ? toUserEntity(user) : null;
        }
        try {
            const user = await this.prisma.user.update({
                where: { id: userId },
                data,
            });
            return toUserEntity(user);
        }
        catch {
            return null;
        }
    }
}
export { UpdateUserRepository };
