import { t } from "elysia";

export const createRuleBodySchema = t.Object({
  name: t.String({
    minLength: 1,
    error: "validation.fields.name.required",
  }),
  description: t.Optional(t.String()),
  resource: t.String({
    minLength: 1,
    error: "validation.fields.name.required",
  }),
  action: t.String({
    minLength: 1,
    error: "validation.fields.name.required",
  }),
});

export const updateRuleBodySchema = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
  resource: t.Optional(t.String()),
  action: t.Optional(t.String()),
});

export const assignRuleBodySchema = t.Object({
  userId: t.String({
    minLength: 1,
    error: "validation.fields.userId.required",
  }),
});

export type CreateRuleRequestDto = typeof createRuleBodySchema.static;
export type UpdateRuleRequestDto = typeof updateRuleBodySchema.static;
export type AssignRuleRequestDto = typeof assignRuleBodySchema.static;
