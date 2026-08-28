import Image from "next/image";
import { useTranslations } from "next-intl";

export function MegaMenu() {
  const t = useTranslations("megaMenu");
  const furnitureItems = t.raw("furnitureItems") as string[];
  const gardenItems = t.raw("gardenItems") as string[];
  const moreItems = t.raw("moreItems") as string[];

  return (
    <div className="grid grid-cols-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_1fr_1fr_1.1fr] lg:gap-8 lg:px-16">
      <MenuColumn heading={t("furnitureHeading")} items={furnitureItems} />
      <MenuColumn heading={t("gardenHeading")} items={gardenItems} />
      <MenuColumn heading={t("moreHeading")} items={moreItems} />

      <div className="grid grid-cols-2 gap-4">
        <MenuImage
          src="/images/menu/meubles.jpg"
          alt={t("furnitureCaption")}
          caption={t("furnitureCaption")}
        />
        <MenuImage
          src="/images/menu/jardin.webp"
          alt={t("gardenCaption")}
          caption={t("gardenCaption")}
        />
      </div>
    </div>
  );
}

function MenuColumn({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold tracking-[0.1em] text-ink/50 uppercase">
        {heading}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="cursor-default text-[15px] text-ink transition-colors hover:text-olive"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-sm text-ink">{caption}</p>
    </div>
  );
}
