import type { Messages } from "../locale";

export const en: Messages = {
  validation: {
    failed: "Invalid data",
    required: "{field} is required",
    invalidEmail: "Invalid email",
    minLength: "{field} must be at least {min} characters",
    invalidType: "{field} has an invalid value",
  },
  fields: {
    name: "Name",
    email: "Email",
    password: "Password",
  },
  errors: {
    userAlreadyExists: "User already exists",
    invalidUserData: "Invalid user data",
    unauthorized: "Unauthorized",
    internalServerError: "Internal server error",
  },
  success: {
    healthOk: "Service is healthy",
    userRegistered: "User registered successfully",
    userCreated: "User created successfully",
    userProfile: "Profile returned successfully",
    usersList: "Users list returned successfully",
  },
};
