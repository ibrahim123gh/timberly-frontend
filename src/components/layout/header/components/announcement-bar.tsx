"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Font12GrayMedium } from "@/components/shared/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Currency = "USD" | "LBP";

export function AnnouncementBar() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const locale = useLocale();

  return (
    <div className="border-b border-outline-warm bg-palette-ece7df">
      <div className="page-gutter flex min-h-8 items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-2 text-[9px] tracking-wide text-ink-secondary">
          <span className="size-1.5 shrink-0 rounded-full bg-brand-sand" />
          <span className="min-w-0 truncate">
            <Font12GrayMedium>
              WORLDWIDE BESPOKE WHITE-GLOVE DELIVERY COMPLIMENTARY OVER $5,000
            </Font12GrayMedium>
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <Link href="/en" lang="en">
            <Font12GrayMedium
              className={locale === "en" ? "text-brand-forest" : undefined}
            >
              EN
            </Font12GrayMedium>
          </Link>
          <Link href="/ar" lang="ar">
            <Font12GrayMedium
              className={locale === "ar" ? "text-brand-forest" : undefined}
            >
              العربية
            </Font12GrayMedium>
          </Link>

          <span aria-hidden="true" className="h-3 w-px bg-outline-warm" />

          <Select
            value={currency}
            onValueChange={(value) => {
              if (value === "USD" || value === "LBP") setCurrency(value);
            }}
          >
            <SelectTrigger
              aria-label="Currency"
              className="h-auto min-h-0 gap-1 rounded-none border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0"
            >
              <Font12GrayMedium>
                <SelectValue />
              </Font12GrayMedium>
            </SelectTrigger>
            <SelectContent align="end" className="min-w-28">
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="LBP">LBP (ل.ل)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
