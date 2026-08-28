import { useTranslations } from "next-intl";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function BestSellers() {
  const t = useTranslations("bestSellers");

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-20">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-serif text-3xl font-medium text-ink">
          {t("heading")}
        </h2>
        <span className="cursor-default text-sm text-ink/60 underline underline-offset-4">
          {t("viewAll")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
