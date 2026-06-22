export type Rule = {
  id: string;
  name: string;
  description: string | null;
  resource: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRuleInput = {
  name: string;
  description?: string | null;
  resource: string;
  action: string;
};

export type UpdateRuleInput = {
  name?: string;
  description?: string | null;
  resource?: string;
  action?: string;
};

export type AssignRuleToUserInput = {
  userId: string;
};
