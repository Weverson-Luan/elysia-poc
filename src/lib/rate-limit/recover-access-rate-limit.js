const COOLDOWN_MS = 15 * 60 * 1000;
const lastRequestByEmail = new Map();
function isRateLimited(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const lastRequest = lastRequestByEmail.get(normalizedEmail);
    if (!lastRequest) {
        return false;
    }
    return Date.now() - lastRequest < COOLDOWN_MS;
}
function recordRequest(email) {
    lastRequestByEmail.set(email.toLowerCase().trim(), Date.now());
}
export { isRateLimited, recordRequest, COOLDOWN_MS };
