"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const t = useTranslations("productDetail");
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
      <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={t("thumbnailAlt", { index: index + 1 })}
            aria-current={active === index}
            className={`relative size-16 shrink-0 overflow-hidden bg-sand transition-opacity sm:size-20 ${
              active === index
                ? "opacity-100 ring-1 ring-ink"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-sand">
        <Image
          key={images[active]}
          src={images[active]}
          alt={productName}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
