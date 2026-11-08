"use client";

import { Controller, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckoutField } from "./checkout-field";
import type { CheckoutFormValues } from "../schema";

const countries = [
  "United States",
  "Lebanon",
  "United Arab Emirates",
  "United Kingdom",
  "Canada",
  "France",
];

export function DeliverySection() {
  const t = useTranslations("checkout");
  const {
    control,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <section className="rounded-xl border border-outline-warm bg-surface-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-forest text-xs font-semibold text-surface-white">
            2
          </span>
          <h2 className="font-heading text-xl text-brand-forest">
            {t("delivery.title")}
          </h2>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
          {t("delivery.includesNote")}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-ink-secondary">
            {t("delivery.country")}
          </label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-auto w-full justify-between rounded-lg border-outline-warm bg-surface-warm-white py-2.5 text-sm">
                  <SelectValue placeholder={t("delivery.countryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p className="text-[11px] text-status-error">{errors.country.message}</p>
          )}
        </div>

        <CheckoutField
          name="city"
          label={t("delivery.city")}
          autoComplete="address-level2"
        />
        <CheckoutField
          name="area"
          label={t("delivery.area")}
          autoComplete="address-level3"
        />
        <CheckoutField
          name="street"
          label={t("delivery.street")}
          autoComplete="street-address"
          className="sm:col-span-2"
        />
        <CheckoutField
          name="apartment"
          label={t("delivery.apartment")}
          optionalLabel={t("delivery.optional")}
          autoComplete="address-line2"
          className="sm:col-span-2"
        />
        <CheckoutField
          name="deliveryNotes"
          as="textarea"
          label={t("delivery.notes")}
          optionalLabel={t("delivery.optional")}
          placeholder={t("delivery.notesPlaceholder")}
          className="sm:col-span-2"
        />
      </div>
    </section>
  );
}
