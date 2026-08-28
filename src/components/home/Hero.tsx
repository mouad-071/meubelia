import Image from "next/image";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-[560px] w-full overflow-hidden sm:h-[640px]">
      <Image
        src="/images/hero/hero-living.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10 sm:pb-16">
        <p className="text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight font-medium text-white sm:text-5xl">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>
        <button
          type="button"
          className="mt-8 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-ink shadow-lg transition-transform hover:-translate-y-0.5"
        >
          {t("cta")}
        </button>
      </div>
    </section>
  );
}
