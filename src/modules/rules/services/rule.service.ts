/**
 * IMPORTS
 */

import type {
  AssignRuleToUserInput,
  CreateRuleInput,
  Rule,
  UpdateRuleInput,
} from "../entities/rule.entity";
import type { IRuleRepository } from "../contratos";
import {
  RuleAlreadyExistsError,
  RuleNotFoundError,
  RuleAlreadyAssignedError,
  RuleAssignmentNotFoundError,
} from "../entities/rule.errors";

class RuleService {
  constructor(private readonly repository: IRuleRepository) {}

  async create(input: CreateRuleInput): Promise<Rule> {
    const existing = await this.repository.findByResourceAndAction(
      input.resource,
      input.action,
    );

    if (existing) {
      throw new RuleAlreadyExistsError();
    }

    return this.repository.create(input);
  }

  async findAll(): Promise<Rule[]> {
    return this.repository.findAll();
  }

  async findById(ruleId: string): Promise<Rule> {
    const rule = await this.repository.findById(ruleId);

    if (!rule) {
      throw new RuleNotFoundError();
    }

    return rule;
  }

  async update(ruleId: string, input: UpdateRuleInput): Promise<Rule> {
    const rule = await this.repository.update(ruleId, input);

    if (!rule) {
      throw new RuleNotFoundError();
    }

    return rule;
  }

  async delete(ruleId: string): Promise<void> {
    const rule = await this.repository.findById(ruleId);

    if (!rule) {
      throw new RuleNotFoundError();
    }

    await this.repository.delete(ruleId);
  }

  async assignToUser(
    ruleId: string,
    input: AssignRuleToUserInput,
  ): Promise<void> {
    const rule = await this.repository.findById(ruleId);
    if (!rule) {
      throw new RuleNotFoundError();
    }

    const rules = await this.repository.findRulesByUserId(input.userId);
    const alreadyAssigned = rules.some((current) => current.id === ruleId);
    if (alreadyAssigned) {
      throw new RuleAlreadyAssignedError();
    }

    await this.repository.assignToUser(ruleId, input.userId);
  }

  async revokeFromUser(ruleId: string, userId: string): Promise<void> {
    const rule = await this.repository.findById(ruleId);
    if (!rule) {
      throw new RuleNotFoundError();
    }

    const rules = await this.repository.findRulesByUserId(userId);
    const assigned = rules.some((current) => current.id === ruleId);
    if (!assigned) {
      throw new RuleAssignmentNotFoundError();
    }

    await this.repository.revokeFromUser(ruleId, userId);
  }

  async findRulesByUserId(userId: string): Promise<Rule[]> {
    return this.repository.findRulesByUserId(userId);
  }

  async userHasRule(
    userId: string,
    resource: string,
    action: string,
  ): Promise<boolean> {
    return this.repository.userHasRule(userId, resource, action);
  }
}

export { RuleService };
