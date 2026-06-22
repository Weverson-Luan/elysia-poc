/**
 * IMPORTS
 */

import type {
  AssignRuleToUserInput,
  CreateRuleInput,
  Rule,
  UpdateRuleInput,
} from "../entities/rule.entity";
import type { RuleService } from "../services/rule.service";

class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  async create(input: CreateRuleInput): Promise<Rule> {
    return this.ruleService.create(input);
  }

  async findAll(): Promise<Rule[]> {
    return this.ruleService.findAll();
  }

  async findById(ruleId: string): Promise<Rule> {
    return this.ruleService.findById(ruleId);
  }

  async update(ruleId: string, input: UpdateRuleInput): Promise<Rule> {
    return this.ruleService.update(ruleId, input);
  }

  async delete(ruleId: string): Promise<void> {
    return this.ruleService.delete(ruleId);
  }

  async assignToUser(
    ruleId: string,
    input: AssignRuleToUserInput,
  ): Promise<void> {
    return this.ruleService.assignToUser(ruleId, input);
  }

  async revokeFromUser(ruleId: string, userId: string): Promise<void> {
    return this.ruleService.revokeFromUser(ruleId, userId);
  }

  async findRulesByUserId(userId: string): Promise<Rule[]> {
    return this.ruleService.findRulesByUserId(userId);
  }
}

export { RuleController };
