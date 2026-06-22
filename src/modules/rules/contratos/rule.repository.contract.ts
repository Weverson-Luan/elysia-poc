/**
 * IMPORTS
 */

import type {
  CreateRuleInput,
  Rule,
  UpdateRuleInput,
} from "../entities/rule.entity";

interface IRuleRepository {
  create(input: CreateRuleInput): Promise<Rule>;
  findAll(): Promise<Rule[]>;
  findById(ruleId: string): Promise<Rule | null>;
  findByResourceAndAction(
    resource: string,
    action: string,
  ): Promise<Rule | null>;
  update(ruleId: string, input: UpdateRuleInput): Promise<Rule | null>;
  delete(ruleId: string): Promise<void>;
  assignToUser(ruleId: string, userId: string): Promise<void>;
  revokeFromUser(ruleId: string, userId: string): Promise<void>;
  findRulesByUserId(userId: string): Promise<Rule[]>;
  userHasRule(
    userId: string,
    resource: string,
    action: string,
  ): Promise<boolean>;
}

export type { IRuleRepository };
