import { Elysia } from "elysia";
import { createUsersModule } from "../../modules/users";
import { health } from "./health";

export const routes = new Elysia({ prefix: "/api" })
  .use(health)
  .use(createUsersModule());
