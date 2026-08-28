import { useTranslations } from "next-intl";
import { products, type ProductSlug } from "@/lib/products";
import { ProductCard } from "@/components/home/ProductCard";

export function RelatedProducts({ excludeSlug }: { excludeSlug: ProductSlug }) {
  const t = useTranslations("productDetail");
  const related = products.filter((product) => product.slug !== excludeSlug);

  return (
    <section className="border-t border-line px-6 py-16 sm:px-10 sm:py-20">
      <h2 className="mb-8 font-serif text-3xl font-medium text-ink">
        {t("youMayAlsoLike")}
      </h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
