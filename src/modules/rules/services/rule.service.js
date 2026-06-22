/**
 * IMPORTS
 */
import { RuleAlreadyExistsError, RuleNotFoundError, RuleAlreadyAssignedError, RuleAssignmentNotFoundError, } from "../entities/rule.errors";
class RuleService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(input) {
        const existing = await this.repository.findByResourceAndAction(input.resource, input.action);
        if (existing) {
            throw new RuleAlreadyExistsError();
        }
        return this.repository.create(input);
    }
    async findAll() {
        return this.repository.findAll();
    }
    async findById(ruleId) {
        const rule = await this.repository.findById(ruleId);
        if (!rule) {
            throw new RuleNotFoundError();
        }
        return rule;
    }
    async update(ruleId, input) {
        const rule = await this.repository.update(ruleId, input);
        if (!rule) {
            throw new RuleNotFoundError();
        }
        return rule;
    }
    async delete(ruleId) {
        const rule = await this.repository.findById(ruleId);
        if (!rule) {
            throw new RuleNotFoundError();
        }
        await this.repository.delete(ruleId);
    }
    async assignToUser(ruleId, input) {
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
    async revokeFromUser(ruleId, userId) {
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
    async findRulesByUserId(userId) {
        return this.repository.findRulesByUserId(userId);
    }
    async userHasRule(userId, resource, action) {
        return this.repository.userHasRule(userId, resource, action);
    }
}
export { RuleService };
