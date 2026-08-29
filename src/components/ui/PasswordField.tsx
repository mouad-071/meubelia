"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";
import { EyeIcon, EyeOffIcon } from "@/components/icons";

type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  autoComplete: string;
  error?: string;
  hint?: string;
  onChange: (value: string) => void;
};

export function PasswordField({
  id,
  name,
  label,
  value,
  autoComplete,
  error,
  hint,
  onChange,
}: Props) {
  const t = useTranslations("auth.fields");
  const [visible, setVisible] = useState(false);
  const hintId = useId();

  return (
    <div className="flex flex-col gap-2">
      <TextField
        id={id}
        name={name}
        label={label}
        type={visible ? "text" : "password"}
        value={value}
        error={error}
        autoComplete={autoComplete}
        aria-describedby={hint && !error ? hintId : undefined}
        onChange={(event) => onChange(event.target.value)}
        trailing={
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? t("hidePassword") : t("showPassword")}
            aria-pressed={visible}
            className="cursor-pointer p-1 text-ink/50 transition-colors hover:text-ink"
          >
            {visible ? (
              <EyeOffIcon className="size-5" />
            ) : (
              <EyeIcon className="size-5" />
            )}
          </button>
        }
      />
      {hint && !error ? (
        <p id={hintId} className="text-xs text-ink/50">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
