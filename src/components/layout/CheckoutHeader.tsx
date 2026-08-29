"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

/** Distraction-free header for cart/checkout: logo only, no nav or icons, so shoppers aren't tempted away mid-purchase. */
export function CheckoutHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-white px-6 py-5 sm:px-10">
      <Link href="/" className="flex flex-col">
        <span className="font-serif text-xl font-semibold tracking-wide text-ink sm:text-2xl">
          Meubelia
        </span>
        <span className="mt-0.5 hidden text-[10px] tracking-[0.25em] text-ink/50 uppercase sm:block">
          {t("tagline")}
        </span>
      </Link>

      <LocaleSwitcher />
    </header>
  );
}
