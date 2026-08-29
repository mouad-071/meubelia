import { apiFetch, ApiError } from "@/lib/api";
import { apiOrigin } from "@/lib/env";

/**
 * Customer authentication against the Laravel API.
 *
 * The API is configured for Sanctum SPA cookie sessions, so every call is
 * credentialed and unsafe requests must be preceded by the CSRF cookie.
 *
 * NOTE: the backend endpoints below are not implemented yet. The pages are
 * complete but submitting will fail until the API side is built.
 */

export type AuthUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
};

export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

/**
 * Requests the XSRF-TOKEN cookie. Sanctum rejects session-authenticated POSTs
 * without it, and the cookie is read back by `apiFetch`.
 */
export async function ensureCsrfCookie(): Promise<void> {
  await fetch(`${apiOrigin()}/sanctum/csrf-cookie`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
}

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  await ensureCsrfCookie();

  const { data } = await apiFetch<AuthUser>("/register", {
    method: "POST",
    body: payload,
  });

  return data;
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  await ensureCsrfCookie();

  const { data } = await apiFetch<AuthUser>("/login", {
    method: "POST",
    body: payload,
  });

  return data;
}

export async function logout(): Promise<void> {
  await apiFetch<null>("/logout", { method: "POST" });
}

/** The signed-in customer, or null when the session is anonymous. */
export async function currentUser(): Promise<AuthUser | null> {
  try {
    const { data } = await apiFetch<AuthUser>("/user");

    return data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }

    throw error;
  }
}

export const SOCIAL_PROVIDERS = ["apple", "google", "facebook"] as const;

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

/**
 * Hands the browser over to the provider's consent screen. The backend owns
 * the whole exchange - the frontend never sees a provider token or secret.
 *
 * NOTE: like the other endpoints here, the redirect route does not exist yet.
 */
export function startSocialAuth(provider: SocialProvider): void {
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- the destination is the Laravel origin, not a Next.js route
  window.location.assign(`${apiOrigin()}/auth/${provider}/redirect`);
}
