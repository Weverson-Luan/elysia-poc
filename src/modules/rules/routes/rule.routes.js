import { Elysia } from "elysia";
import { assignRuleBodySchema, createRuleBodySchema, updateRuleBodySchema, } from "../dtos/rule.dto";
import { mapRuleErrorToHttp } from "../errors/http.error";
import { buildApiSuccess } from "@/http/types/api-response";
import { getMessages } from "@/http/i18n";
import { resolveLocale } from "@/http/i18n/locale";
import { authMacro } from "@/http/plugins/auth-macro";
function createRuleRoutes({ ruleController }) {
    return new Elysia({ name: "rules", prefix: "/rules" })
        .use(authMacro)
        .post("/", async ({ body, request, set }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const rule = await ruleController.create(body);
            set.status = 201;
            return buildApiSuccess(messages.success.ruleCreated, 201, rule);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, set, request);
        }
    }, { body: createRuleBodySchema, auth: true })
        .get("/", async ({ request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const rules = await ruleController.findAll();
            return buildApiSuccess(messages.success.rulesList, 200, rules);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, undefined, request);
        }
    }, { auth: true })
        .get("/:id", async ({ params, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const rule = await ruleController.findById(params.id);
            return buildApiSuccess(messages.success.ruleReturned, 200, rule);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, undefined, request);
        }
    }, {
        auth: true,
    })
        .patch("/:id", async ({ params, body, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const rule = await ruleController.update(params.id, body);
            return buildApiSuccess(messages.success.ruleUpdated, 200, rule);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, undefined, request);
        }
    }, { body: updateRuleBodySchema, auth: true })
        .delete("/:id", async ({ params, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            await ruleController.delete(params.id);
            return buildApiSuccess(messages.success.ruleDeleted, 200, null);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, undefined, request);
        }
    }, { auth: true })
        .post("/:id/assign-user", async ({ params, body, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            await ruleController.assignToUser(params.id, body);
            return buildApiSuccess(messages.success.ruleAssigned, 200, null);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, undefined, request);
        }
    }, { body: assignRuleBodySchema, auth: true })
        .delete("/:id/revoke-user", async ({ params, query, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const userId = String(query.userId);
            await ruleController.revokeFromUser(params.id, userId);
            return buildApiSuccess(messages.success.ruleRevoked, 200, null);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, undefined, request);
        }
    }, { auth: true })
        .get("/user/:userId", async ({ params, request }) => {
        try {
            const locale = resolveLocale(request.headers.get("accept-language") ?? undefined);
            const messages = getMessages(locale);
            const rules = await ruleController.findRulesByUserId(params.userId);
            return buildApiSuccess(messages.success.userRulesReturned, 200, rules);
        }
        catch (error) {
            return mapRuleErrorToHttp(error, undefined, request);
        }
    }, { auth: true });
}
export { createRuleRoutes };
