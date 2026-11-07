import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";
import { products } from "./data/products";
import { ProductDetailView } from "./components/product-detail-view";
import { RelatedProducts } from "./components/related-products";

type ProductDetailsPageProps = {
  slug: string;
};

export function ProductDetailsPage({ slug }: ProductDetailsPageProps) {
  const t = useTranslations();
  const locale = useLocale() as "en" | "ar";
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <EmptyState
        title={t("pages.productDetails")}
        description={t("empty.product")}
      />
    );
  }

  const categoryLabel = t(`product.categories.${product.category}`);
  const images = product.images ?? [product.image];
  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <div className="page-gutter py-8 sm:py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-secondary"
      >
        <Link href={`/${locale}`} className="transition-colors hover:text-brand-walnut">
          {t("navigation.home")}
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/${locale}/products?category=${product.category}`}
          className="transition-colors hover:text-brand-walnut"
        >
          {categoryLabel}
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.subcategory}</span>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="truncate font-semibold text-ink-deep">
          {product.name}
        </span>
      </nav>

      <ProductDetailView product={product} images={images} locale={locale} />

      <RelatedProducts products={relatedProducts} locale={locale} />
    </div>
  );
}
