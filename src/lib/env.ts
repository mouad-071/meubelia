/**
 * Centralised access to environment configuration.
 *
 * Only `NEXT_PUBLIC_*` values may be read in code that runs in the browser.
 * Server-only secrets must never be added to this module's public exports.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable "${name}". Copy .env.example to .env.local and fill it in.`,
    );
  }

  return value;
}

/** Public site URL, used for canonical and Open Graph URLs. */
export const siteUrl = required(
  "NEXT_PUBLIC_SITE_URL",
  process.env.NEXT_PUBLIC_SITE_URL,
);

/** API base URL as reached from the browser. */
export const publicApiUrl = required(
  "NEXT_PUBLIC_API_URL",
  process.env.NEXT_PUBLIC_API_URL,
);

/**
 * API base URL for the current runtime. On the server this may point at an
 * internal hostname that the browser cannot resolve.
 */
export function apiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return publicApiUrl;
  }

  return process.env.API_URL ?? publicApiUrl;
}
