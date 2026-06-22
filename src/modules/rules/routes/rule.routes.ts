import type { Context } from "elysia";
import { Elysia } from "elysia";
import { RuleController } from "../controllers/rule.controller";
import {
  assignRuleBodySchema,
  createRuleBodySchema,
  updateRuleBodySchema,
  type AssignRuleRequestDto,
  type CreateRuleRequestDto,
  type UpdateRuleRequestDto,
} from "../dtos/rule.dto";
import { mapRuleErrorToHttp } from "../errors/http.error";
import { buildApiSuccess } from "@/http/types/api-response";
import { getMessages } from "@/http/i18n";
import { resolveLocale } from "@/http/i18n/locale";
import { authMacro } from "@/http/plugins/auth-macro";

type CreateRuleRoutesDeps = {
  ruleController: RuleController;
};

function createRuleRoutes({ ruleController }: CreateRuleRoutesDeps) {
  return new Elysia({ name: "rules", prefix: "/rules" })
    .use(authMacro)
    .post(
      "/",
      async ({ body, request, set }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          const rule = await ruleController.create(
            body as CreateRuleRequestDto,
          );

          set.status = 201;
          return buildApiSuccess(messages.success.ruleCreated, 201, rule);
        } catch (error) {
          return mapRuleErrorToHttp(error, set, request);
        }
      },
      { body: createRuleBodySchema, auth: true },
    )
    .get(
      "/",
      async ({ request }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          const rules = await ruleController.findAll();

          return buildApiSuccess(messages.success.rulesList, 200, rules);
        } catch (error) {
          return mapRuleErrorToHttp(error, undefined, request);
        }
      },
      { auth: true },
    )
    .get(
      "/:id",
      async ({ params, request }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          const rule = await ruleController.findById(params.id as string);

          return buildApiSuccess(messages.success.ruleReturned, 200, rule);
        } catch (error) {
          return mapRuleErrorToHttp(error, undefined, request);
        }
      },
      {
        auth: true,
      },
    )
    .patch(
      "/:id",
      async ({ params, body, request }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          const rule = await ruleController.update(
            params.id as string,
            body as UpdateRuleRequestDto,
          );

          return buildApiSuccess(messages.success.ruleUpdated, 200, rule);
        } catch (error) {
          return mapRuleErrorToHttp(error, undefined, request);
        }
      },
      { body: updateRuleBodySchema, auth: true },
    )
    .delete(
      "/:id",
      async ({ params, request }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          await ruleController.delete(params.id as string);

          return buildApiSuccess(messages.success.ruleDeleted, 200, null);
        } catch (error) {
          return mapRuleErrorToHttp(error, undefined, request);
        }
      },
      { auth: true },
    )
    .post(
      "/:id/assign-user",
      async ({ params, body, request }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          await ruleController.assignToUser(
            params.id as string,
            body as AssignRuleRequestDto,
          );

          return buildApiSuccess(messages.success.ruleAssigned, 200, null);
        } catch (error) {
          return mapRuleErrorToHttp(error, undefined, request);
        }
      },
      { body: assignRuleBodySchema, auth: true },
    )
    .delete(
      "/:id/revoke-user",
      async ({ params, query, request }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          const userId = String(query.userId);
          await ruleController.revokeFromUser(params.id as string, userId);

          return buildApiSuccess(messages.success.ruleRevoked, 200, null);
        } catch (error) {
          return mapRuleErrorToHttp(error, undefined, request);
        }
      },
      { auth: true },
    )
    .get(
      "/user/:userId",
      async ({ params, request }: Context) => {
        try {
          const locale = resolveLocale(
            request.headers.get("accept-language") ?? undefined,
          );
          const messages = getMessages(locale);
          const rules = await ruleController.findRulesByUserId(
            params.userId as string,
          );

          return buildApiSuccess(
            messages.success.userRulesReturned,
            200,
            rules,
          );
        } catch (error) {
          return mapRuleErrorToHttp(error, undefined, request);
        }
      },
      { auth: true },
    );
}

export { createRuleRoutes };
