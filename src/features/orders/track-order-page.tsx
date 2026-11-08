"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { useOrdersStore } from "./store/orders-store";
import { OrderLookupForm } from "./components/order-lookup-form";
import { OrderDetails } from "./components/order-details";

export function TrackOrderPage() {
  const t = useTranslations();
  const tOrders = useTranslations("orders");
  const locale = useLocale() as "en" | "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get("order") ?? "";

  const findOrder = useOrdersStore((state) => state.findOrder);
  const recentOrders = useOrdersStore((state) => state.orders);

  const order = orderNumberParam ? findOrder(orderNumberParam) : undefined;
  const notFound = Boolean(orderNumberParam) && !order;

  const handleLookup = (orderNumber: string) => {
    router.push(`/${locale}/track-order?order=${encodeURIComponent(orderNumber)}`);
  };

  let resultContent: ReactNode;
  if (order) {
    resultContent = <OrderDetails order={order} locale={locale} />;
  } else if (notFound) {
    resultContent = (
      <div className="rounded-xl border border-outline-warm bg-surface-stone p-6 text-center">
        <p className="text-sm font-medium text-ink-body">
          {tOrders("notFound", { orderNumber: orderNumberParam })}
        </p>
        <p className="mt-1 text-xs text-ink-secondary">{tOrders("notFoundHint")}</p>
      </div>
    );
  } else if (recentOrders.length > 0) {
    resultContent = (
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
          {tOrders("recentOrders")}
        </p>
        <ul className="flex flex-col gap-2">
          {recentOrders.map((recentOrder) => (
            <li key={recentOrder.orderNumber}>
              <button
                type="button"
                onClick={() => handleLookup(recentOrder.orderNumber)}
                className="flex w-full items-center justify-between rounded-lg border border-outline-warm bg-surface-white px-4 py-3 text-start transition-colors hover:border-brand-sand"
              >
                <span className="text-sm font-medium text-brand-forest">
                  {recentOrder.orderNumber}
                </span>
                <span className="text-xs text-ink-secondary">
                  {new Intl.DateTimeFormat(locale === "ar" ? "ar-LB" : "en-US", {
                    dateStyle: "medium",
                  }).format(new Date(recentOrder.placedAt))}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    resultContent = <p className="text-sm text-ink-secondary">{t("empty.orders")}</p>;
  }

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
          {t("navigation.trackOrder")}
        </span>
      </nav>

      <h1 className="mb-6 font-heading text-3xl text-brand-forest sm:text-4xl">
        {t("pages.trackOrder")}
      </h1>

      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <OrderLookupForm defaultValue={orderNumberParam} onSubmit={handleLookup} />
        {resultContent}
      </div>
    </div>
  );
}
