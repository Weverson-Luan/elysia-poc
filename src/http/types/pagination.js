import { t } from "elysia";
export const paginationQuerySchema = t.Object({
    page: t.Optional(t.Numeric({
        minimum: 1,
        default: 1,
    })),
    limit: t.Optional(t.Numeric({
        minimum: 1,
        maximum: 100,
        default: 10,
    })),
});
export function toPaginationParams(query) {
    return {
        page: query.page ?? 1,
        limit: query.limit ?? 10,
    };
}
