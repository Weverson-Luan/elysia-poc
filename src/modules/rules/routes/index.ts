import { createRuleRoutes } from "./rule.routes";
import { RuleController } from "../controllers/rule.controller";

type CreateRulesModuleRoutesDeps = {
  ruleController: RuleController;
};

function createRulesRoutes({ ruleController }: CreateRulesModuleRoutesDeps) {
  return createRuleRoutes({ ruleController });
}

export { createRulesRoutes };
