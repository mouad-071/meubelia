"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium tracking-wide text-ink/70 uppercase"
      aria-label={t("language")}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink/30">/</span>}
          <Link
            href={pathname}
            locale={loc}
            className={
              loc === locale
                ? "text-ink"
                : "text-ink/50 transition-colors hover:text-ink"
            }
          >
            {loc}
          </Link>
        </span>
      ))}
    </div>
  );
}
