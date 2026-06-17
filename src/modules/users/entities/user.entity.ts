export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type UpdateUserInput = {
  name?: string;
  phone?: string | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phone: string | null;
  createdAt: Date;
};
