import Image from "next/image";
import { useTranslations } from "next-intl";

export function Collection() {
  const t = useTranslations("collection");

  return (
    <section id="collection" className="scroll-mt-24 px-6 py-16 sm:px-10 sm:py-20">
      <h2 className="mb-8 font-serif text-3xl font-medium text-ink">
        {t("heading")}
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          <Tile
            src="/images/collection/canapes.jpg"
            label={t("categories.canapes")}
            className="h-56 sm:h-64 lg:h-72"
          />
          <Tile
            src="/images/collection/lits.jpg"
            label={t("categories.lits")}
            className="h-72 sm:h-80 lg:h-96"
          />
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          <Tile
            src="/images/collection/chaises.jpg"
            label={t("categories.chaises")}
            className="h-72 sm:h-80 lg:h-96"
          />
          <Tile
            src="/images/collection/tables.jpg"
            label={t("categories.tables")}
            className="h-56 sm:h-64 lg:h-72"
          />
        </div>
      </div>
    </section>
  );
}

function Tile({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className: string;
}) {
  return (
    <div className={`group relative overflow-hidden bg-sand ${className}`}>
      <Image
        src={src}
        alt={label}
        fill
        sizes="(min-width: 1024px) 25vw, 45vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute bottom-3 left-3 bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-ink">
        {label}
      </span>
    </div>
  );
}
