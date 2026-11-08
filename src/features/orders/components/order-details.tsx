"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { getOrderStatus, type Order, type OrderStatus } from "../types/order";
import { OrderStatusStepper } from "./order-status-stepper";

type OrderDetailsProps = {
  order: Order;
  locale: "en" | "ar";
};

export function OrderDetails({ order, locale }: OrderDetailsProps) {
  const t = useTranslations("orders");
  const tCart = useTranslations("cart");
  const status = getOrderStatus(order.placedAt);

  const statusLabels: Record<OrderStatus, string> = {
    processing: t("status.processing"),
    confirmed: t("status.confirmed"),
    "out-for-delivery": t("status.outForDelivery"),
    delivered: t("status.delivered"),
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en-US", {
      style: "currency",
      currency: order.currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(value);

  const placedDate = new Intl.DateTimeFormat(locale === "ar" ? "ar-LB" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(order.placedAt));

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-outline-warm bg-surface-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-outline-warm pb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-secondary">
            {t("order")} {order.orderNumber}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            {t("placedOn", { date: placedDate })}
          </p>
        </div>
        <span className="rounded-full bg-surface-stone px-3 py-1 text-xs font-semibold text-brand-forest">
          {statusLabels[status]}
        </span>
      </div>

      <OrderStatusStepper status={status} labels={statusLabels} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-secondary">
            {t("deliveryAddress")}
          </p>
          <p className="text-sm text-ink-body">{order.customer.fullName}</p>
          <p className="text-sm text-ink-body">
            {order.address.street}
            {order.address.apartment ? `, ${order.address.apartment}` : ""}
          </p>
          <p className="text-sm text-ink-body">
            {order.address.area}, {order.address.city}
          </p>
          <p className="text-sm text-ink-body">{order.address.country}</p>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-secondary">
            {t("contact")}
          </p>
          <p className="text-sm text-ink-body">{order.customer.email}</p>
          <p className="text-sm text-ink-body">{order.customer.phone}</p>
        </div>
      </div>

      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-secondary">
          {t("items")}
        </p>
        <ul className="flex flex-col gap-3 border-t border-outline-warm pt-3">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-surface-stone">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-brand-forest">
                  {item.name}
                </p>
                <p className="truncate text-xs text-ink-secondary">
                  {item.color} · {item.material} · ×{item.quantity}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-forest">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 border-t border-outline-warm pt-4">
        <div className="flex items-center justify-between text-sm text-ink-body">
          <span>{tCart("subtotal")}</span>
          <span className="tabular-nums">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-ink-body">
          <span>{tCart("delivery")}</span>
          <span className="tabular-nums">
            {order.deliveryFee === 0 ? tCart("free") : formatPrice(order.deliveryFee)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-outline-warm pt-3">
          <span className="font-heading text-lg text-brand-forest">
            {tCart("grandTotal")}
          </span>
          <span className="text-xl font-semibold tabular-nums text-brand-forest">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
