import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/product/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { routing } from "@/i18n/routing";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "bestSellers" });

  return {
    title: t(`products.${product.slug}.name`),
    description: t(`products.${product.slug}.description`),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: "bestSellers" });

  return (
    <>
      <Breadcrumb
        categoryLabel={t(`products.${product.slug}.categoryLabel`)}
        productName={t(`products.${product.slug}.name`)}
      />

      <div className="grid grid-cols-1 gap-10 px-6 pb-16 sm:px-10 sm:pb-20 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          images={product.gallery}
          productName={t(`products.${product.slug}.name`)}
        />
        <ProductInfo product={product} />
      </div>

      <RelatedProducts excludeSlug={product.slug} />
    </>
  );
}
