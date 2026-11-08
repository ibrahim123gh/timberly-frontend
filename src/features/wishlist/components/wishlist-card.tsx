"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { StoreBadge } from "@/components/shared/store-badge";
import { StoreButton } from "@/components/shared/store-button";
import {
  Font11GrayMedium,
  Font18PlayfairForestRegular,
} from "@/components/shared/typography";
import { productBadges } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types/product";

type WishlistCardProps = {
  product: Product;
  locale: "en" | "ar";
  onRemove: () => void;
  onAddToCart: () => void;
};

export function WishlistCard({
  product,
  locale,
  onRemove,
  onAddToCart,
}: WishlistCardProps) {
  const t = useTranslations("product");
  const tWishlist = useTranslations("wishlist");
  const badge = product.badge ? productBadges[product.badge] : null;
  const isInStock = product.leadTime.startsWith("Ready-Made");

  const price = new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en-US", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-outline-warm bg-surface-white">
      <div className="relative aspect-[5/5] overflow-hidden bg-surface-stone">
        <Link
          href={`/${locale}/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className="object-cover"
          />
        </Link>

        {badge && (
          <StoreBadge
            backgroundClassName={badge.backgroundClassName}
            textClassName={badge.textClassName}
            className="pointer-events-none absolute start-3 top-3 max-w-[calc(100%-64px)] rounded-sm px-2 py-1 text-[10px] font-semibold leading-tight tracking-wide"
          >
            {badge.label}
          </StoreBadge>
        )}

        <button
          type="button"
          aria-label={`Remove ${product.name} from wishlist`}
          onClick={onRemove}
          className="absolute end-3 top-3 flex size-9 items-center justify-center rounded-full bg-surface-white text-brand-forest shadow-sm transition-colors hover:bg-surface-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut"
        >
          <X className="size-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Font11GrayMedium className="mb-2 block truncate uppercase tracking-wider">
          {product.description}
        </Font11GrayMedium>

        <h3>
          <Link href={`/${locale}/products/${product.slug}`} className="group">
            <Font18PlayfairForestRegular className="line-clamp-2 transition-colors group-hover:text-brand-walnut">
              {product.name}
            </Font18PlayfairForestRegular>
          </Link>
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              isInStock ? "bg-status-success" : "bg-brand-sand",
            )}
          />
          {isInStock ? t("inStock") : t("madeToOrder")}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-outline-warm pt-3">
          <span className="text-base font-semibold tabular-nums text-brand-forest">
            {price}
          </span>
        </div>

        <StoreButton
          type="button"
          onClick={onAddToCart}
          className="mt-3 min-h-9 w-full gap-1.5"
        >
          {t("addToCart")}
        </StoreButton>

        <Link
          href={`/${locale}/products/${product.slug}`}
          className="mt-2 text-center text-xs font-medium text-ink-secondary underline-offset-2 transition-colors hover:text-brand-walnut hover:underline"
        >
          {tWishlist("viewDetails")}
        </Link>
      </div>
    </article>
  );
}
