import { apiBaseUrl } from "@/lib/env";
import type { ApiFailure, ApiPaginated, ApiSuccess } from "@/types/api";

/**
 * Single entry point for talking to the Laravel API. Components should call
 * feature-specific helpers built on top of this rather than calling `fetch`
 * directly, so error handling and the response envelope stay consistent.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }

  /** True when the backend rejected the payload with field level errors. */
  get isValidationError(): boolean {
    return this.status === 422;
  }
}

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  /** Serialised as JSON unless it is already a FormData instance. */
  body?: unknown;
  /** Appended to the URL as a query string; empty values are dropped. */
  query?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrl(path: string, query: ApiRequestOptions["query"]): string {
  const url = new URL(
    path.replace(/^\//, ""),
    `${apiBaseUrl().replace(/\/$/, "")}/`,
  );

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

/**
 * Performs a request and unwraps the API envelope, throwing an `ApiError`
 * for any non-successful response.
 *
 * Note: `fetch` is uncached by default in this Next.js version. Pass
 * `next: { revalidate, tags }` on calls whose responses may be cached.
 */
export async function apiFetch<T>(
  path: string,
  { body, query, headers, ...init }: ApiRequestOptions = {},
): Promise<ApiSuccess<T>> {
  const isFormData = body instanceof FormData;

  const response = await fetch(buildUrl(path, query), {
    ...init,
    // Sends the Sanctum session cookie on browser requests.
    credentials: init.credentials ?? "include",
    headers: {
      Accept: "application/json",
      ...xsrfHeader(init.method),
      ...(isFormData ? {} : body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...headers,
    },
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return { success: true, data: undefined as T };
  }

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok || !isEnvelope(payload) || payload.success !== true) {
    const failure = isEnvelope(payload) && payload.success === false
      ? (payload as ApiFailure)
      : null;

    throw new ApiError(
      failure?.message ?? `Request to ${path} failed.`,
      response.status,
      failure?.errors,
    );
  }

  return payload as ApiSuccess<T>;
}

/** Convenience wrapper for endpoints that return a paginated collection. */
export async function apiFetchPaginated<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiPaginated<T>> {
  return (await apiFetch<T[]>(path, options)) as ApiPaginated<T>;
}

function isEnvelope(value: unknown): value is { success: unknown } {
  return typeof value === "object" && value !== null && "success" in value;
}

/**
 * Sanctum expects the XSRF-TOKEN cookie echoed back as a header on unsafe
 * requests. Only available in the browser; server-side calls authenticate
 * differently and skip this.
 */
function xsrfHeader(method: string | undefined): Record<string, string> {
  if (typeof document === "undefined") {
    return {};
  }

  const safe = !method || ["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());

  if (safe) {
    return {};
  }

  const token = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  return token ? { "X-XSRF-TOKEN": decodeURIComponent(token) } : {};
}
