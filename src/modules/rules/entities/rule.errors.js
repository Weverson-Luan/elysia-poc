export class RuleAlreadyExistsError extends Error {
    constructor() {
        super("Rule already exists");
        this.name = "RuleAlreadyExistsError";
    }
}
export class RuleNotFoundError extends Error {
    constructor() {
        super("Rule not found");
        this.name = "RuleNotFoundError";
    }
}
export class RuleAlreadyAssignedError extends Error {
    constructor() {
        super("Rule already assigned to user");
        this.name = "RuleAlreadyAssignedError";
    }
}
export class RuleAssignmentNotFoundError extends Error {
    constructor() {
        super("Rule assignment not found");
        this.name = "RuleAssignmentNotFoundError";
    }
}
