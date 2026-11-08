"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Banknote, CreditCard, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { CheckoutField } from "./checkout-field";
import type { CheckoutFormValues } from "../schema";

export function PaymentSection() {
  const t = useTranslations("checkout");
  const { register, watch } = useFormContext<CheckoutFormValues>();
  const paymentMethod = watch("paymentMethod");

  return (
    <section className="rounded-xl border border-outline-warm bg-surface-white p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-forest text-xs font-semibold text-surface-white">
          3
        </span>
        <h2 className="font-heading text-xl text-brand-forest">
          {t("payment.title")}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <label
          className={cn(
            "flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors",
            paymentMethod === "card"
              ? "border-brand-forest bg-surface-warm-white"
              : "border-outline-warm hover:border-brand-sand",
          )}
        >
          <span className="flex items-center gap-3">
            <input
              type="radio"
              value="card"
              className="size-4 accent-brand-forest"
              {...register("paymentMethod")}
            />
            <CreditCard className="size-4 text-brand-walnut" strokeWidth={1.7} />
            <span className="text-sm font-medium text-ink-body">
              {t("payment.card")}
            </span>
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-ink-muted">
            VISA · MC · AMEX
          </span>
        </label>

        <label
          className={cn(
            "flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors",
            paymentMethod === "cash"
              ? "border-brand-forest bg-surface-warm-white"
              : "border-outline-warm hover:border-brand-sand",
          )}
        >
          <span className="flex items-center gap-3">
            <input
              type="radio"
              value="cash"
              className="size-4 accent-brand-forest"
              {...register("paymentMethod")}
            />
            <Banknote className="size-4 text-brand-walnut" strokeWidth={1.7} />
            <span className="text-sm font-medium text-ink-body">
              {t("payment.cash")}
            </span>
          </span>
        </label>
      </div>

      {paymentMethod === "card" && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <CheckoutField
            name="cardNumber"
            label={t("payment.cardNumber")}
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            className="sm:col-span-2"
          />
          <CheckoutField
            name="cardName"
            label={t("payment.cardName")}
            autoComplete="cc-name"
            className="sm:col-span-2"
          />
          <CheckoutField
            name="cardExpiry"
            label={t("payment.cardExpiry")}
            placeholder="MM/YY"
            autoComplete="cc-exp"
            maxLength={5}
          />
          <CheckoutField
            name="cardCvv"
            label={t("payment.cardCvv")}
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
          />
        </div>
      )}

      <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
        <Lock className="size-3.5 shrink-0" strokeWidth={1.7} />
        {t("payment.secureNote")}
      </p>
    </section>
  );
}
