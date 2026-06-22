export function toUserEntity(record) {
    return {
        id: record.id,
        name: record.name,
        email: record.email,
        emailVerified: record.emailVerified,
        phone: record.phone ?? null,
        createdAt: record.createdAt,
    };
}
