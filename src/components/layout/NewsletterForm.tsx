"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@/components/icons";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const consentId = useId();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!agreed) return;
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <div className="flex items-center border-b border-white/30 focus-within:border-white/70">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("emailPlaceholder")}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          aria-label={t("emailSubmit")}
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:text-olive-light cursor-pointer"
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>

      <label
        htmlFor={consentId}
        className="mt-4 flex items-start gap-2 text-xs text-white/60"
      >
        <input
          id={consentId}
          type="checkbox"
          required
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-0.5 size-3.5 shrink-0 accent-olive-light"
        />
        {t("consent")}
      </label>
    </form>
  );
}
