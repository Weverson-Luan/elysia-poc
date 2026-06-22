export function toUserResponseDto(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        phone: user.phone,
        createdAt: user.createdAt.toISOString(),
    };
}
