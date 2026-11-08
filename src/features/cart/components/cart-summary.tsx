"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { StoreButton } from "@/components/shared/store-button";
import { FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE } from "../constants";
import type { CartLineItem } from "../types/cart";

type CartSummaryProps = {
  items: CartLineItem[];
  locale: "en" | "ar";
};

export function CartSummary({ items, locale }: CartSummaryProps) {
  const t = useTranslations("cart");
  const tProduct = useTranslations("product");
  const [promoCode, setPromoCode] = useState("");

  const currency = items[0]?.currency ?? "USD";
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const remainingForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotal,
    0,
  );
  const deliveryProgress = Math.min(
    (subtotal / FREE_DELIVERY_THRESHOLD) * 100,
    100,
  );
  const hasFreeDelivery = remainingForFreeDelivery === 0;
  const deliveryFee = hasFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(value);

  const trustItems = [
    { icon: ShieldCheck, label: t("secureCheckout") },
    { icon: Truck, label: tProduct("trust.delivery") },
    { icon: RotateCcw, label: tProduct("trust.trial") },
  ];

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    toast.info(t("promoUnavailable"));
  };

  return (
    <aside className="flex flex-col gap-5 rounded-xl border border-outline-warm bg-surface-white p-5 sm:p-6">
      <div>
        {hasFreeDelivery ? (
          <p className="text-xs font-medium text-status-success-strong">
            {t("freeDeliveryUnlocked")}
          </p>
        ) : (
          <p className="text-xs font-medium text-ink-secondary">
            {t("freeDeliveryProgress", {
              amount: formatPrice(remainingForFreeDelivery),
            })}
          </p>
        )}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-stone">
          <div
            className={cn(
              "h-full rounded-full bg-brand-sand transition-all",
              hasFreeDelivery && "bg-status-success",
            )}
            style={{ width: `${deliveryProgress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 border-t border-outline-warm pt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-forest">
          {t("orderSummary")} · {t("itemCount", { count: itemCount })}
        </p>

        <div className="flex items-center justify-between text-sm text-ink-body">
          <span>{t("subtotal")}</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-ink-body">
          <span>{t("delivery")}</span>
          <span className="tabular-nums">
            {hasFreeDelivery ? t("free") : formatPrice(deliveryFee)}
          </span>
        </div>

        <p className="text-xs text-ink-muted">{t("taxNote")}</p>
      </div>

      <div className="flex flex-col gap-2 border-t border-outline-warm pt-5">
        <label htmlFor="promo-code" className="text-xs font-medium text-ink-secondary">
          {t("promoCode")}
        </label>
        <div className="flex gap-2">
          <input
            id="promo-code"
            type="text"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder={t("promoCodePlaceholder")}
            className="min-w-0 flex-1 rounded-full border border-outline-warm bg-surface-warm-white px-4 py-2 text-xs text-ink-body outline-none focus-visible:ring-2 focus-visible:ring-brand-walnut/30"
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            className="shrink-0 rounded-full border border-brand-forest px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-forest transition-colors hover:bg-brand-forest hover:text-surface-white"
          >
            {t("apply")}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-outline-warm pt-5">
        <span className="font-heading text-lg text-brand-forest">{t("grandTotal")}</span>
        <span className="text-xl font-semibold tabular-nums text-brand-forest">
          {formatPrice(total)}
        </span>
      </div>

      <StoreButton href={`/${locale}/checkout`} className="min-h-12 w-full">
        {t("checkout")}
      </StoreButton>

      <ul className="flex flex-col gap-2 text-xs text-ink-secondary">
        {trustItems.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-1.5">
            <Icon className="size-3.5 text-brand-walnut" strokeWidth={1.7} />
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
