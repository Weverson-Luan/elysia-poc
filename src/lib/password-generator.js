const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
export function generateTemporaryPassword(length = 12) {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, (byte) => CHARSET[byte % CHARSET.length]).join("");
}
