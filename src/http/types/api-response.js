export function buildApiSuccess(message, statusCode, data) {
    return { message, statusCode, data };
}
export function buildPaginatedData(items, total, page, limit) {
    return {
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
        page,
        limit,
        items,
    };
}
