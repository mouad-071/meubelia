import Image from "next/image";
import { useTranslations } from "next-intl";

export function Sustainability() {
  const t = useTranslations("sustainability");

  return (
    <section className="relative h-[460px] w-full overflow-hidden sm:h-[560px]">
      <Image
        src="/images/sustainability/banner.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      <div className="absolute right-6 bottom-8 max-w-sm text-right sm:right-10 sm:bottom-10">
        <p className="max-w-sm text-base leading-relaxed text-white sm:text-lg">
          {t("text")}
        </p>
        <span className="mt-4 inline-block bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-ink">
          {t("tag")}
        </span>
      </div>
    </section>
  );
}
