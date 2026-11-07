"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { StoreBadge } from "@/components/shared/store-badge";
import { productBadges } from "./product-card";
import type { Product } from "../types/product";

type ProductGalleryProps = {
  product: Product;
  images: string[];
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
};

export function ProductGallery({
  product,
  images,
  isWishlisted = false,
  onToggleWishlist,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const badge = product.badge ? productBadges[product.badge] : null;
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-outline-warm bg-surface-stone">
        <Image
          src={activeImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />

        {badge && (
          <StoreBadge
            backgroundClassName={badge.backgroundClassName}
            textClassName={badge.textClassName}
            className="pointer-events-none absolute start-4 top-4 rounded-sm px-2 py-1 text-[10px] font-semibold leading-tight tracking-wide"
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
          onClick={onToggleWishlist}
          className="absolute end-4 top-4 flex size-10 items-center justify-center rounded-full bg-surface-white text-brand-forest shadow-sm transition-colors hover:bg-surface-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut"
        >
          <Heart
            className={cn("size-[18px]", isWishlisted && "fill-brand-forest")}
            strokeWidth={1.7}
          />
        </button>
      </div>

      {images.length > 1 && (
        <div
          role="group"
          aria-label="Product images"
          className="mt-3 grid grid-cols-5 gap-3"
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show image ${index + 1} of ${product.name}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border bg-surface-stone transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut",
                index === activeIndex
                  ? "border-brand-forest"
                  : "border-outline-warm hover:border-brand-sand",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
