/**
 * IMPORTS
 */

import { createRulesRoutes } from "./routes";
import { RuleRepository } from "./repositories/rule.repository";
import { RuleService } from "./services/rule.service";
import { RuleController } from "./controllers/rule.controller";
import { prisma } from "../../lib/prisma";

/**
 * Cria o módulo de regras e suas dependências.
 */
export function createRulesModule() {
  const repository = new RuleRepository(prisma);
  const service = new RuleService(repository);
  const controller = new RuleController(service);

  return createRulesRoutes({ ruleController: controller });
}
