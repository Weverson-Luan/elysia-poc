/**
 * IMPORTS
 */

import type { PrismaClient } from "@prisma/client";
import type {
  CreateRuleInput,
  Rule,
  UpdateRuleInput,
} from "../entities/rule.entity";
import type { IRuleRepository } from "../contratos";

function toRuleEntity(rule: { [key: string]: any }): Rule {
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

class RuleRepository implements IRuleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateRuleInput): Promise<Rule> {
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

  async findAll(): Promise<Rule[]> {
    const rules = await this.prisma.rule.findMany();
    return rules.map(toRuleEntity);
  }

  async findById(ruleId: string): Promise<Rule | null> {
    const rule = await this.prisma.rule.findUnique({
      where: { id: ruleId },
    });
    return rule ? toRuleEntity(rule) : null;
  }

  async findByResourceAndAction(
    resource: string,
    action: string,
  ): Promise<Rule | null> {
    const rule = await this.prisma.rule.findFirst({
      where: { resource, action },
    });
    return rule ? toRuleEntity(rule) : null;
  }

  async update(ruleId: string, input: UpdateRuleInput): Promise<Rule | null> {
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

  async delete(ruleId: string): Promise<void> {
    await this.prisma.rule.delete({ where: { id: ruleId } });
  }

  async assignToUser(ruleId: string, userId: string): Promise<void> {
    await this.prisma.userRulePermission.create({
      data: { ruleId, userId },
    });
  }

  async revokeFromUser(ruleId: string, userId: string): Promise<void> {
    await this.prisma.userRulePermission.deleteMany({
      where: {
        ruleId,
        userId,
      },
    });
  }

  async findRulesByUserId(userId: string): Promise<Rule[]> {
    const permissions = await this.prisma.userRulePermission.findMany({
      where: { userId },
      include: { rule: true },
    });

    return permissions.map(({ rule }) => toRuleEntity(rule));
  }

  async userHasRule(
    userId: string,
    resource: string,
    action: string,
  ): Promise<boolean> {
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
