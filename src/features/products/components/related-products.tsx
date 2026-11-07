import { useTranslations } from "next-intl";

import { ProductCard } from "./product-card";
import type { Product } from "../types/product";

type RelatedProductsProps = {
  products: Product[];
  locale: "en" | "ar";
};

export function RelatedProducts({ products, locale }: RelatedProductsProps) {
  const t = useTranslations("product");

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="related-products-title"
      className="mt-16 border-t border-outline-warm pt-10"
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-brand-walnut">
        {t("relatedEyebrow")}
      </p>

      <h2
        id="related-products-title"
        className="font-heading text-2xl leading-tight text-brand-forest sm:text-3xl"
      >
        {t("relatedTitle")}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </section>
  );
}
