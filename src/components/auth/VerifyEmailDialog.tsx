"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";

type Props = {
  open: boolean;
  email: string;
  /** Returns to the form so the customer can correct their address. */
  onChangeEmail: () => void;
  onClose: () => void;
};

/** Shown once registration succeeds, while the account awaits verification. */
export function VerifyEmailDialog({
  open,
  email,
  onChangeEmail,
  onClose,
}: Props) {
  const t = useTranslations("auth.verifyEmail");

  return (
    <Modal open={open} onClose={onClose} labelledBy="verify-email-title">
      <h2
        id="verify-email-title"
        className="font-serif text-3xl font-semibold text-ink"
      >
        {t("title")}
      </h2>

      <p className="mt-6 text-sm leading-relaxed text-ink/70">
        {t("body", { email })}
      </p>

      <p className="mt-6 text-sm leading-relaxed text-ink/70">
        <button
          type="button"
          onClick={onChangeEmail}
          className="cursor-pointer text-olive underline underline-offset-4 transition-colors hover:text-olive-dark"
        >
          {t("changeLink")}
        </button>{" "}
        {t("changeHint")}
      </p>
    </Modal>
  );
}
