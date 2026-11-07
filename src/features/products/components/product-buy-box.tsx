import { useTranslations } from "next-intl";
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { StoreButton } from "@/components/shared/store-button";
import { Font13GrayRegular } from "@/components/shared/typography";
import type { Product } from "../types/product";

type ProductBuyBoxProps = {
  product: Product;
  locale: "en" | "ar";
  selectedColorIndex: number;
  onSelectColor: (index: number) => void;
  selectedMaterial: string;
  onSelectMaterial: (material: string) => void;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
};

export function ProductBuyBox({
  product,
  locale,
  selectedColorIndex,
  onSelectColor,
  selectedMaterial,
  onSelectMaterial,
  quantity,
  onIncrement,
  onDecrement,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}: ProductBuyBoxProps) {
  const t = useTranslations("product");
  const isInStock = product.leadTime.startsWith("Ready-Made");
  const selectedColor = product.colors[selectedColorIndex] ?? product.colors[0];

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en-US", {
      style: "currency",
      currency: product.currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(value);

  const price = formatPrice(product.price);

  const trustItems = [
    { icon: Truck, label: t("trust.delivery") },
    { icon: RotateCcw, label: t("trust.trial") },
    { icon: ShieldCheck, label: t("trust.warranty") },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="font-heading text-3xl leading-tight text-brand-forest sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold tabular-nums text-brand-forest">
            {price}
          </span>
          <span className="text-xs font-medium text-ink-muted">
            {product.currency}
          </span>
        </p>

        <span className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              isInStock ? "bg-status-success" : "bg-brand-sand",
            )}
          />
          {isInStock ? t("inStock") : t("madeToOrder")}
        </span>
      </div>

      <Font13GrayRegular className="mt-3">
        {product.longDescription}
      </Font13GrayRegular>

      <div className="mt-6">
        <p className="text-xs font-medium text-ink-secondary">
          {t("color")}: <span className="text-ink-deep">{selectedColor.name}</span>
        </p>
        <div role="group" aria-label={t("color")} className="mt-2 flex flex-wrap gap-2.5">
          {product.colors.map((color, index) => (
            <button
              key={color.name}
              type="button"
              aria-label={color.name}
              aria-pressed={index === selectedColorIndex}
              onClick={() => onSelectColor(index)}
              className={cn(
                "flex size-8 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut",
                index === selectedColorIndex
                  ? "border-brand-forest"
                  : "border-transparent hover:border-outline-neutral",
              )}
            >
              <span
                aria-hidden="true"
                className="size-6 rounded-full border border-outline-warm"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-ink-secondary">
          {t("frameMaterial")}: <span className="text-ink-deep">{selectedMaterial}</span>
        </p>
        <div role="group" aria-label={t("frameMaterial")} className="mt-2 flex flex-wrap gap-2">
          {product.materialOptions.map((material) => (
            <button
              key={material}
              type="button"
              aria-pressed={material === selectedMaterial}
              onClick={() => onSelectMaterial(material)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut",
                material === selectedMaterial
                  ? "border-brand-forest bg-brand-forest text-surface-white"
                  : "border-outline-warm bg-surface-white text-brand-forest hover:border-brand-sand",
              )}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-outline-warm p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-forest">
          {t("dimensions")}
        </p>
        <p className="mt-2 text-sm text-ink-body">
          {t("width")}: {product.dimensions.width} · {t("height")}: {product.dimensions.height} ·{" "}
          {t("depth")}: {product.dimensions.depth}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div
          role="group"
          aria-label={t("quantity")}
          className="flex items-center rounded-full border border-outline-warm"
        >
          <button
            type="button"
            aria-label={t("decrease")}
            onClick={onDecrement}
            disabled={quantity <= 1}
            className="flex size-11 items-center justify-center text-brand-forest transition-colors hover:bg-surface-stone disabled:pointer-events-none disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums text-brand-forest">
            {quantity}
          </span>
          <button
            type="button"
            aria-label={t("increase")}
            onClick={onIncrement}
            className="flex size-11 items-center justify-center text-brand-forest transition-colors hover:bg-surface-stone"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <StoreButton
          type="button"
          onClick={onAddToCart}
          className="min-h-11 flex-1 gap-2 px-6"
        >
          {t("addToCart")} — {formatPrice(product.price * quantity)}
        </StoreButton>

        <button
          type="button"
          aria-label={isWishlisted ? t("removeFromWishlist") : t("saveToWishlist")}
          aria-pressed={isWishlisted}
          onClick={onToggleWishlist}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-outline-warm text-brand-forest transition-colors hover:bg-surface-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut"
        >
          <Heart
            className={cn("size-[18px]", isWishlisted && "fill-brand-forest")}
            strokeWidth={1.7}
          />
        </button>
      </div>

      <ul className="mt-5 flex flex-col gap-2 border-t border-outline-warm pt-4 text-xs text-ink-secondary sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
        {trustItems.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-1.5">
            <Icon className="size-3.5 text-brand-walnut" strokeWidth={1.7} />
            {label}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-ink-muted">
        {t("sku")}: {product.sku}
      </p>
    </div>
  );
}
