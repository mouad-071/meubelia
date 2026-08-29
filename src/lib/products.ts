export type ColorKey = "beige" | "noir" | "gris" | "vert" | "bleu" | "moutarde";

export const colorSwatches: Record<ColorKey, string> = {
  beige: "#c9b596",
  noir: "#1a1a1a",
  gris: "#9c9a94",
  vert: "#55643e",
  bleu: "#22314d",
  moutarde: "#c6902e",
};

export interface ProductVariant {
  color: ColorKey;
  price: number;
  image: string;
  hoverImage: string;
}

export type ProductSlug = "jackson" | "porto" | "dakota";

export interface Product {
  slug: ProductSlug;
  variants: ProductVariant[];
  /** Lifestyle/detail shots for the product page gallery, shared across color variants. */
  gallery: string[];
}

export const products: Product[] = [
  {
    slug: "jackson",
    variants: [
      {
        color: "beige",
        price: 178.29,
        image: "/images/products/jackson-beige.jpg",
        hoverImage: "/images/products/jackson-beige-hover.webp",
      },
      {
        color: "noir",
        price: 178.29,
        image: "/images/products/jackson-noir.jpg",
        hoverImage: "/images/products/jackson-noir-hover.webp",
      },
      {
        color: "gris",
        price: 178.29,
        image: "/images/products/jackson-gris.jpg",
        hoverImage: "/images/products/jackson-gris-hover.webp",
      },
      {
        color: "vert",
        price: 178.29,
        image: "/images/products/jackson-vert.jpg",
        hoverImage: "/images/products/jackson-vert-hover.webp",
      },
    ],
    gallery: [
      "/images/products/jackson-beige.jpg",
      "/images/products/jackson-beige-hover.webp",
      "/images/products/jackson-gallery-3.jpg",
      "/images/products/jackson-gallery-4.webp",
      "/images/products/jackson-gallery-5.webp",
    ],
  },
  {
    slug: "porto",
    variants: [
      {
        color: "vert",
        price: 1013.97,
        image: "/images/products/porto-vert.jpg",
        hoverImage: "/images/products/porto-vert-hover.webp",
      },
      {
        color: "bleu",
        price: 1013.97,
        image: "/images/products/porto-bleu.jpg",
        hoverImage: "/images/products/porto-bleu-hover.webp",
      },
      {
        color: "moutarde",
        price: 811.2,
        image: "/images/products/porto-moutarde.jpg",
        hoverImage: "/images/products/porto-moutarde-hover.webp",
      },
    ],
    gallery: [
      "/images/products/porto-gallery-1.jpg",
      "/images/products/porto-vert-hover.webp",
      "/images/products/porto-vert.jpg",
      "/images/products/porto-gallery-4.jpg",
      "/images/products/porto-gallery-5.webp",
    ],
  },
  {
    slug: "dakota",
    variants: [
      {
        color: "beige",
        price: 175.71,
        image: "/images/products/dakota-beige.jpg",
        hoverImage: "/images/products/dakota-beige-hover.webp",
      },
      {
        color: "gris",
        price: 175.71,
        image: "/images/products/dakota-gris.jpg",
        hoverImage: "/images/products/dakota-gris-hover.webp",
      },
      {
        color: "noir",
        price: 175.71,
        image: "/images/products/dakota-noir.jpg",
        hoverImage: "/images/products/dakota-noir-hover.webp",
      },
    ],
    gallery: [
      "/images/products/dakota-beige.jpg",
      "/images/products/dakota-beige-hover.webp",
      "/images/products/dakota-gallery-3.jpg",
      "/images/products/dakota-gallery-4.jpg",
      "/images/products/dakota-gallery-5.webp",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getVariant(
  product: Product,
  color: ColorKey,
): ProductVariant | undefined {
  return product.variants.find((variant) => variant.color === color);
}
