import { isAPIError } from "@better-auth/core/utils/is-api-error";
import { InvalidUserDataError, UserAlreadyExistsError, } from "../../entities/user.errors";
export function mapAuthError(error) {
    if (isAPIError(error)) {
        const apiError = error;
        const status = apiError.statusCode ?? apiError.status;
        const message = apiError.body?.message ?? apiError.message ?? "Invalid user data";
        if (status === 409 ||
            status === 422 ||
            message.toLowerCase().includes("already exists")) {
            return new UserAlreadyExistsError();
        }
        if (status === 400) {
            return new InvalidUserDataError(message);
        }
    }
    return error instanceof Error ? error : new Error("Failed to create user");
}
