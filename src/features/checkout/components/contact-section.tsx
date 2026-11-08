"use client";

import { useTranslations } from "next-intl";
import { CheckoutField } from "./checkout-field";

export function ContactSection() {
  const t = useTranslations("checkout");

  return (
    <section className="rounded-xl border border-outline-warm bg-surface-white p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-forest text-xs font-semibold text-surface-white">
          1
        </span>
        <h2 className="font-heading text-xl text-brand-forest">
          {t("contact.title")}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <CheckoutField
          name="fullName"
          label={t("contact.fullName")}
          autoComplete="name"
          className="sm:col-span-2"
        />
        <CheckoutField
          name="email"
          label={t("contact.email")}
          type="email"
          inputMode="email"
          autoComplete="email"
        />
        <CheckoutField
          name="phone"
          label={t("contact.phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>
    </section>
  );
}
