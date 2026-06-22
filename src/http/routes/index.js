import { Elysia } from "elysia";
import { createUsersModule } from "../../modules/users";
import { createRulesModule } from "../../modules/rules";
import { health } from "./health";
export const routes = new Elysia({ prefix: "/api" })
    .use(health)
    .use(createUsersModule())
    .use(createRulesModule());
