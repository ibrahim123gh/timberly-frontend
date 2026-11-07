"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Font11GrayMedium,
  Font16ForestSemibold,
  Font18PlayfairForestRegular,
} from "@/components/shared/typography";
import { StoreButton } from "@/components/shared/store-button";
import { StoreBadge } from "@/components/shared/store-badge";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  locale?: "en" | "ar";
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
};

export const productBadges = {
  bestseller: {
    label: "Bestseller",
    backgroundClassName: "bg-brand-sand",
    textClassName: "text-brand-forest",
  },
  custom: {
    label: "Custom sizing available",
    backgroundClassName: "bg-surface-stone",
    textClassName: "text-brand-forest",
  },
  new: {
    label: "New",
    backgroundClassName: "bg-brand-forest",
    textClassName: "text-surface-white",
  },
} as const;

export function ProductCard({
  product,
  locale = "en",
  isWishlisted = false,
  onToggleWishlist,
  onQuickAdd,
}: ProductCardProps) {
  const badge = product.badge ? productBadges[product.badge] : null;

  const price = new Intl.NumberFormat(
    locale === "ar" ? "ar-LB" : "en-US",
    {
      style: "currency",
      currency: product.currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    },
  ).format(product.price);

  return (
    <article className="group overflow-hidden rounded-xl border border-outline-warm bg-surface-white">
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
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
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
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          disabled={!onToggleWishlist}
          onClick={() => onToggleWishlist?.(product)}
          className="absolute end-3 top-3 flex size-9 items-center justify-center rounded-full bg-surface-white text-brand-forest transition-colors enabled:hover:bg-surface-stone disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut"
        >
          <Heart
            className={cn(
              "size-[18px]",
              isWishlisted && "fill-brand-forest",
            )}
            strokeWidth={1.7}
          />
        </button>
      </div>

      <div className="p-4">
        <Font11GrayMedium className="mb-2 block truncate uppercase tracking-wider">
          {product.description}
        </Font11GrayMedium>

        <h3>
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="group"
          >
            <Font18PlayfairForestRegular className="line-clamp-2 transition-colors group-hover:text-brand-walnut">
              {product.name}
            </Font18PlayfairForestRegular>
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-outline-warm pt-3">
          <Font16ForestSemibold>
            {price}
          </Font16ForestSemibold>

          <StoreButton
            type="button"
            disabled={!onQuickAdd}
            onClick={() => onQuickAdd?.(product)}
            backgroundClassName="bg-brand-forest hover:bg-brand-forest"
            className="min-h-9 gap-1.5 px-3 cursor-pointer focus-visible:outline-brand-walnut disabled:pointer-events-auto disabled:cursor-pointer disabled:opacity-100"
          >
            <ShoppingBag className="size-3.5" />
            Quick Add
          </StoreButton>
        </div>
      </div>
    </article>
  );
}
