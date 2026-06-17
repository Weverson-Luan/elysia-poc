export type ApiSuccessBody<T> = {
  message: string;
  statusCode: number;
  data: T;
};

export type PaginatedData<T> = {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  items: T[];
};

export function buildApiSuccess<T>(
  message: string,
  statusCode: number,
  data: T,
): ApiSuccessBody<T> {
  return { message, statusCode, data };
}

export function buildPaginatedData<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedData<T> {
  return {
    total,
    totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
    page,
    limit,
    items,
  };
}
