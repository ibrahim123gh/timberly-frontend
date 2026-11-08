"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { StoreButton } from "@/components/shared/store-button";

type OrderLookupFormProps = {
  defaultValue?: string;
  onSubmit: (orderNumber: string) => void;
};

export function OrderLookupForm({
  defaultValue = "",
  onSubmit,
}: OrderLookupFormProps) {
  const t = useTranslations("orders");
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
      className="flex flex-col gap-3 rounded-xl border border-outline-warm bg-surface-white p-5 sm:flex-row sm:items-end sm:gap-4 sm:p-6"
    >
      <div className="flex flex-1 flex-col gap-1.5">
        <label
          htmlFor="order-number"
          className="text-[11px] font-semibold uppercase tracking-wide text-ink-secondary"
        >
          {t("lookup.label")}
        </label>
        <input
          id="order-number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t("lookup.placeholder")}
          className="w-full rounded-lg border border-outline-warm bg-surface-warm-white px-3.5 py-2.5 text-sm text-ink-body outline-none transition-colors focus-visible:border-brand-walnut focus-visible:ring-2 focus-visible:ring-brand-walnut/20"
        />
      </div>
      <StoreButton type="submit" className="min-h-11 shrink-0 gap-2 px-6">
        <Search className="size-4" />
        {t("lookup.submit")}
      </StoreButton>
    </form>
  );
}
