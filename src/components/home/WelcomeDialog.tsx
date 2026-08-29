"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Modal } from "@/components/ui/Modal";

const FLAG = "welcome";

/**
 * Greets a customer who has just signed in. The auth flow redirects here with
 * `?welcome=1`; the flag is stripped once the dialog is open so a refresh or
 * a shared link does not replay it.
 */
export function WelcomeDialog() {
  const t = useTranslations("auth.welcome");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Read once on mount: the effect below removes the flag straight away.
  const [open, setOpen] = useState(() => searchParams.get(FLAG) === "1");

  useEffect(() => {
    if (searchParams.get(FLAG) === "1") {
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      labelledBy="welcome-title"
    >
      <h2 id="welcome-title" className="font-serif text-3xl font-semibold text-ink">
        {t("title")}
      </h2>

      <p className="mt-5 font-serif text-xl text-ink/80">{t("tagline")}</p>

      <p className="mt-6 text-lg font-medium text-ink">{t("question")}</p>

      <button
        type="button"
        onClick={() => setOpen(false)}
        className="mt-6 w-full cursor-pointer bg-olive py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-olive-dark"
      >
        {t("cta")}
      </button>
    </Modal>
  );
}
