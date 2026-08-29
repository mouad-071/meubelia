"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { FormAlert } from "@/components/auth/FormAlert";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";
import { ApiError } from "@/lib/api";
import { login } from "@/lib/auth";
import {
  compactErrors,
  fromApiErrors,
  validateEmail,
  type FieldErrors,
  type ValidationKey,
} from "@/lib/validation";

type Field = "email" | "password";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const message = (key: ValidationKey | undefined) =>
    key ? t(`errors.${key}`) : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = compactErrors<Field>({
      email: message(validateEmail(email)),
      password: password === "" ? t("errors.passwordRequired") : undefined,
    });

    setErrors(found);
    setFormError(null);

    if (Object.keys(found).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      // The home page shows the welcome dialog for this flag.
      router.push("/?welcome=1");
    } catch (error) {
      if (error instanceof ApiError && error.isValidationError) {
        setErrors(fromApiErrors<Field>(error.errors));
        setFormError(t("errors.invalidCredentials"));
      } else if (error instanceof ApiError && error.status === 401) {
        setFormError(t("errors.invalidCredentials"));
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
          id="login-email"
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
          id="login-password"
          name="password"
          label={t("fields.password")}
          autoComplete="current-password"
          value={password}
          error={errors.password}
          onChange={setPassword}
        />

        <Link
          href="/forgot-password"
          className="self-start text-sm text-olive transition-colors hover:text-olive-dark"
        >
          {t("login.forgot")}
        </Link>

        <Button
          type="submit"
          loading={submitting}
          loadingLabel={t("pending")}
          className="mt-4 w-full"
        >
          {t("login.submit")}
        </Button>
      </form>

      <div className="mt-8">
        <SocialAuthButtons />
      </div>

      <p className="mt-8 text-center text-sm font-medium text-ink">
        {t("login.noAccount")}{" "}
        <Link
          href="/register"
          className="font-normal text-olive-light transition-colors hover:text-olive"
        >
          {t("login.createAccount")}
        </Link>
      </p>
    </>
  );
}
