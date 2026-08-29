"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { FormAlert } from "@/components/auth/FormAlert";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { VerifyEmailDialog } from "@/components/auth/VerifyEmailDialog";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";
import { ApiError } from "@/lib/api";
import { register } from "@/lib/auth";
import {
  MIN_PASSWORD_LENGTH,
  compactErrors,
  fromApiErrors,
  validateEmail,
  validateName,
  validatePassword,
  type FieldErrors,
  type ValidationKey,
} from "@/lib/validation";

type Field = "first_name" | "last_name" | "email" | "password";

export function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const message = (key: ValidationKey | undefined) =>
    key ? t(`errors.${key}`) : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = compactErrors<Field>({
      first_name: message(validateName(firstName)),
      last_name: message(validateName(lastName)),
      email: message(validateEmail(email)),
      password: message(validatePassword(password)),
    });

    setErrors(found);
    setFormError(null);

    if (Object.keys(found).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      await register({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
      });
      // The account still needs email verification before it can be used.
      setRegisteredEmail(email.trim());
    } catch (error) {
      if (error instanceof ApiError && error.isValidationError) {
        setErrors(fromApiErrors<Field>(error.errors));
        setFormError(error.message);
      } else if (error instanceof ApiError && error.status === 429) {
        setFormError(t("errors.tooManyAttempts"));
      } else {
        setFormError(t("errors.generic"));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        {formError ? <FormAlert>{formError}</FormAlert> : null}

        <TextField
          id="register-first-name"
          name="first_name"
          label={t("fields.firstName")}
          autoComplete="given-name"
          value={firstName}
          error={errors.first_name}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          id="register-last-name"
          name="last_name"
          label={t("fields.lastName")}
          autoComplete="family-name"
          value={lastName}
          error={errors.last_name}
          onChange={(event) => setLastName(event.target.value)}
        />

        <TextField
          id="register-email"
          name="email"
          label={t("fields.email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <PasswordField
          id="register-password"
          name="password"
          label={t("fields.password")}
          autoComplete="new-password"
          hint={t("fields.passwordHint", { min: MIN_PASSWORD_LENGTH })}
          value={password}
          error={errors.password}
          onChange={setPassword}
        />

        <Button
          type="submit"
          loading={submitting}
          loadingLabel={t("pending")}
          className="mt-2 w-full"
        >
          {t("register.submit")}
        </Button>
      </form>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-ink sm:gap-x-6">
        {t("register.hasAccount")}
        <Link
          href="/login"
          className="text-olive-light transition-colors hover:text-olive"
        >
          {t("register.signIn")}
        </Link>
      </p>

      <div className="mt-6">
        <SocialAuthButtons />
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-ink/60">
        {t.rich("register.legal", {
          terms: (chunks) => (
            <Link href="/terms" className="text-olive underline underline-offset-2">
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link
              href="/privacy"
              className="text-olive underline underline-offset-2"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      <VerifyEmailDialog
        open={registeredEmail !== null}
        email={registeredEmail ?? ""}
        onChangeEmail={() => setRegisteredEmail(null)}
        onClose={() => router.push("/")}
      />
    </>
  );
}
