/**
 * IMPORTS
 */
function toRuleEntity(rule) {
    return {
        id: rule.id,
        name: rule.name,
        description: rule.description,
        resource: rule.resource,
        action: rule.action,
        createdAt: rule.createdAt,
        updatedAt: rule.updatedAt,
    };
}
class RuleRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(input) {
        const rule = await this.prisma.rule.create({
            data: {
                name: input.name,
                description: input.description ?? null,
                resource: input.resource,
                action: input.action,
            },
        });
        return toRuleEntity(rule);
    }
    async findAll() {
        const rules = await this.prisma.rule.findMany();
        return rules.map(toRuleEntity);
    }
    async findById(ruleId) {
        const rule = await this.prisma.rule.findUnique({
            where: { id: ruleId },
        });
        return rule ? toRuleEntity(rule) : null;
    }
    async findByResourceAndAction(resource, action) {
        const rule = await this.prisma.rule.findFirst({
            where: { resource, action },
        });
        return rule ? toRuleEntity(rule) : null;
    }
    async update(ruleId, input) {
        const rule = await this.prisma.rule.update({
            where: { id: ruleId },
            data: {
                name: input.name,
                description: input.description,
                resource: input.resource,
                action: input.action,
            },
        });
        return rule ? toRuleEntity(rule) : null;
    }
    async delete(ruleId) {
        await this.prisma.rule.delete({ where: { id: ruleId } });
    }
    async assignToUser(ruleId, userId) {
        await this.prisma.userRulePermission.create({
            data: { ruleId, userId },
        });
    }
    async revokeFromUser(ruleId, userId) {
        await this.prisma.userRulePermission.deleteMany({
            where: {
                ruleId,
                userId,
            },
        });
    }
    async findRulesByUserId(userId) {
        const permissions = await this.prisma.userRulePermission.findMany({
            where: { userId },
            include: { rule: true },
        });
        return permissions.map(({ rule }) => toRuleEntity(rule));
    }
    async userHasRule(userId, resource, action) {
        const permission = await this.prisma.userRulePermission.findFirst({
            where: {
                userId,
                rule: {
                    resource,
                    action,
                },
            },
        });
        return Boolean(permission);
    }
}
export { RuleRepository };
