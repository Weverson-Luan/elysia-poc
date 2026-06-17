interface IResetUserPasswordRepository {
  execute(userId: string, email: string, newPassword: string): Promise<void>;
}

export type { IResetUserPasswordRepository };
