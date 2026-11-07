"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { EmptyState } from "@/components/shared/empty-state";
import { StoreActionLink } from "@/components/shared/store-action-link";
import { useCartStore } from "./store/cart-store";
import { CartLineItemRow } from "./components/cart-line-item";
import { CartSummary } from "./components/cart-summary";

export function CartPage() {
  const t = useTranslations();
  const tCart = useTranslations("cart");
  const locale = useLocale() as "en" | "ar";
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return <EmptyState title={t("pages.cart")} description={t("empty.cart")} />;
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="page-gutter py-8 sm:py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-secondary"
      >
        <Link href={`/${locale}`} className="transition-colors hover:text-brand-walnut">
          {t("navigation.home")}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="font-semibold text-ink-deep">
          {t("navigation.cart")}
        </span>
      </nav>

      <h1 className="font-heading text-3xl text-brand-forest sm:text-4xl">
        {t("pages.cart")}
        <span className="ms-2 text-lg font-normal text-ink-secondary">
          ({tCart("itemCount", { count: itemCount })})
        </span>
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <ul className="flex flex-col">
            {items.map((item) => (
              <CartLineItemRow key={item.id} item={item} locale={locale} />
            ))}
          </ul>

          <StoreActionLink href={`/${locale}/products`} className="mt-6">
            {tCart("continueShopping")}
          </StoreActionLink>
        </div>

        <CartSummary items={items} locale={locale} />
      </div>
    </div>
  );
}
