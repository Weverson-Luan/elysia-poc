export type ValidationIssue = {
  path: string;
  message?: string;
  summary?: string;
  schema?: unknown;
};

export type ValidationErrorLike = {
  all: ValidationIssue[];
};
