/**
 * Client-side validation for form UX only. The Laravel API remains the
 * authoritative validator (CLAUDE.md section 8); its 422 responses are
 * surfaced through ApiError.errors.
 *
 * Validators return a message key rather than text, so the calling form
 * resolves it through the "auth.errors" namespace in the active locale.
 */

export type ValidationKey =
  | "nameRequired"
  | "nameTooShort"
  | "emailRequired"
  | "emailInvalid"
  | "passwordRequired"
  | "passwordTooShort";

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MIN_PASSWORD_LENGTH = 8;

export function validateName(value: string): ValidationKey | undefined {
  if (value.trim() === "") return "nameRequired";

  return value.trim().length < 2 ? "nameTooShort" : undefined;
}

export function validateEmail(value: string): ValidationKey | undefined {
  if (value.trim() === "") return "emailRequired";

  return EMAIL_PATTERN.test(value.trim()) ? undefined : "emailInvalid";
}

export function validatePassword(value: string): ValidationKey | undefined {
  if (value === "") return "passwordRequired";

  return value.length < MIN_PASSWORD_LENGTH ? "passwordTooShort" : undefined;
}

/** Drops the fields whose validator returned no message. */
export function compactErrors<T extends string>(
  candidates: Record<T, string | undefined>,
): FieldErrors<T> {
  return Object.fromEntries(
    Object.entries(candidates).filter(([, message]) => message !== undefined),
  ) as FieldErrors<T>;
}

/** Keeps the first message of each field returned by a Laravel 422 response. */
export function fromApiErrors<T extends string>(
  errors: Record<string, string[]> | undefined,
): FieldErrors<T> {
  if (!errors) return {};

  return Object.fromEntries(
    Object.entries(errors)
      .filter(([, messages]) => messages.length > 0)
      .map(([field, messages]) => [field, messages[0]]),
  ) as FieldErrors<T>;
}
