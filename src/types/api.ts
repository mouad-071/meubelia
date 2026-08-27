/**
 * The JSON envelope every Laravel API endpoint responds with.
 * Mirrors App\Support\ApiResponse on the backend.
 */

export type ApiSuccess<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiPaginationMeta = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
};

export type ApiPaginated<T> = ApiSuccess<T[]> & {
  meta: ApiPaginationMeta;
};

export type ApiFailure = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;
