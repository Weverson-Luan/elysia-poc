import type { Messages } from "../locale";

export const en: Messages = {
  validation: {
    failed: "Invalid data",
    required: "{field} is required",
    invalidEmail: "Invalid email",
    invalidPhone: "Invalid phone number",
    minLength: "{field} must be at least {min} characters",
    invalidType: "{field} has an invalid value",
  },
  fields: {
    name: "Name",
    email: "Email",
    password: "Password",
    phone: "Phone",
  },
  errors: {
    userAlreadyExists: "User already exists",
    userNotFound: "User not found",
    invalidUserData: "Invalid user data",
    unauthorized: "Unauthorized",
    rateLimitExceeded: "Please wait a few minutes before requesting again.",
    internalServerError: "Internal server error",
  },
  success: {
    healthOk: "Service is healthy",
    userRegistered: "User registered successfully",
    userCreated: "User created successfully",
    userProfile: "Profile returned successfully",
    userUpdated: "User updated successfully",
    usersList: "Users list returned successfully",
    credentialsSent:
      "If this email exists in our system, you will receive your access credentials shortly.",
  },
};
