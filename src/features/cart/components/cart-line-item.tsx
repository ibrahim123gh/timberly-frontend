"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { useCartStore } from "../store/cart-store";
import type { CartLineItem } from "../types/cart";

type CartLineItemRowProps = {
  item: CartLineItem;
  locale: "en" | "ar";
};

export function CartLineItemRow({ item, locale }: CartLineItemRowProps) {
  const t = useTranslations("cart");
  const tProduct = useTranslations("product");
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en-US", {
      style: "currency",
      currency: item.currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <li className="flex gap-4 border-b border-outline-warm py-5 first:pt-0 last:border-b-0">
      <Link
        href={`/${locale}/products/${item.slug}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-surface-stone sm:size-28"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/${locale}/products/${item.slug}`}
            className="font-heading text-base text-brand-forest transition-colors hover:text-brand-walnut sm:text-lg"
          >
            {item.name}
          </Link>
          <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-forest sm:text-base">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>

        <p className="mt-1 text-xs text-ink-secondary">
          {tProduct("color")}: {item.color} · {tProduct("frameMaterial")}: {item.material}
        </p>

        <p className="mt-0.5 text-xs text-ink-muted">
          {formatPrice(item.price)} {t("each")}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div
            role="group"
            aria-label={tProduct("quantity")}
            className="flex items-center rounded-full border border-outline-warm"
          >
            <button
              type="button"
              aria-label={tProduct("decrease")}
              onClick={() => decrementItem(item.id)}
              disabled={item.quantity <= 1}
              className="flex size-9 items-center justify-center text-brand-forest transition-colors hover:bg-surface-stone disabled:pointer-events-none disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold tabular-nums text-brand-forest">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={tProduct("increase")}
              onClick={() => incrementItem(item.id)}
              className="flex size-9 items-center justify-center text-brand-forest transition-colors hover:bg-surface-stone"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-1.5 text-xs font-medium text-status-error transition-colors hover:text-brand-walnut"
          >
            <Trash2 className="size-3.5" />
            {t("remove")}
          </button>
        </div>
      </div>
    </li>
  );
}
