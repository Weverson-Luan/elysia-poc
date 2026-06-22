/**
 * IMPORTS
 */
class RuleController {
    constructor(ruleService) {
        this.ruleService = ruleService;
    }
    async create(input) {
        return this.ruleService.create(input);
    }
    async findAll() {
        return this.ruleService.findAll();
    }
    async findById(ruleId) {
        return this.ruleService.findById(ruleId);
    }
    async update(ruleId, input) {
        return this.ruleService.update(ruleId, input);
    }
    async delete(ruleId) {
        return this.ruleService.delete(ruleId);
    }
    async assignToUser(ruleId, input) {
        return this.ruleService.assignToUser(ruleId, input);
    }
    async revokeFromUser(ruleId, userId) {
        return this.ruleService.revokeFromUser(ruleId, userId);
    }
    async findRulesByUserId(userId) {
        return this.ruleService.findRulesByUserId(userId);
    }
}
export { RuleController };
