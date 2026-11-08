"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { PenLine } from "lucide-react";

import { StoreButton } from "@/components/shared/store-button";
import { FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE } from "@/features/cart/constants";
import type { CartLineItem } from "@/features/cart/types/cart";

type CheckoutOrderSummaryProps = {
  items: CartLineItem[];
  locale: "en" | "ar";
  isSubmitting: boolean;
};

export function CheckoutOrderSummary({
  items,
  locale,
  isSubmitting,
}: CheckoutOrderSummaryProps) {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");

  const currency = items[0]?.currency ?? "USD";
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const hasFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = hasFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <aside className="flex h-fit flex-col gap-5 rounded-xl border border-outline-warm bg-surface-white p-5 sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl text-brand-forest">
          {t("summary.title")}
        </h2>
        <span className="text-xs font-medium text-ink-secondary">
          {tCart("itemCount", { count: itemCount })}
        </span>
      </div>

      <ul className="flex flex-col gap-3 border-y border-outline-warm py-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-surface-stone">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover"
              />
              <span className="absolute -end-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-brand-forest text-[10px] font-semibold text-surface-white">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-brand-forest">
                {item.name}
              </p>
              <p className="truncate text-xs text-ink-secondary">
                {item.color} · {item.material}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-forest">
              {formatPrice(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-sm text-ink-body">
          <span>{tCart("subtotal")}</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-ink-body">
          <span>{tCart("delivery")}</span>
          <span className="tabular-nums">
            {hasFreeDelivery ? tCart("free") : formatPrice(deliveryFee)}
          </span>
        </div>
        <p className="text-xs text-ink-muted">{tCart("taxNote")}</p>
      </div>

      <div className="flex items-center justify-between border-t border-outline-warm pt-4">
        <span className="font-heading text-lg text-brand-forest">
          {tCart("grandTotal")}
        </span>
        <span className="text-xl font-semibold tabular-nums text-brand-forest">
          {formatPrice(total)}
        </span>
      </div>

      <StoreButton type="submit" disabled={isSubmitting} className="min-h-12 w-full">
        {isSubmitting ? t("summary.placing") : t("summary.placeOrder")}
      </StoreButton>

      <p className="flex items-start gap-2 text-xs text-ink-secondary">
        <PenLine className="mt-0.5 size-3.5 shrink-0 text-brand-walnut" strokeWidth={1.7} />
        {t("summary.note")}
      </p>
    </aside>
  );
}
