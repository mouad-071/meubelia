import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Breadcrumb({
  categoryLabel,
  productName,
}: {
  categoryLabel: string;
  productName: string;
}) {
  const t = useTranslations("productDetail");

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 px-6 py-4 text-xs text-ink/60 sm:px-10"
    >
      <Link href="/" className="hover:text-ink">
        {t("breadcrumbHome")}
      </Link>
      <span className="text-ink/30">/</span>
      <span>{categoryLabel}</span>
      <span className="text-ink/30">/</span>
      <span className="text-ink">{productName}</span>
    </nav>
  );
}
