"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { StoreButton } from "@/components/shared/store-button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { getCartItemId } from "@/features/cart/types/cart";
import { products } from "@/features/products/data/products";
import type { Product } from "@/features/products/types/product";
import { useWishlistStore } from "./store/wishlist-store";
import { WishlistCard } from "./components/wishlist-card";

type StockFilter = "all" | "in-stock" | "made-to-order";

export function WishlistPage() {
  const t = useTranslations();
  const tProduct = useTranslations("product");
  const tWishlist = useTranslations("wishlist");
  const locale = useLocale() as "en" | "ar";

  const productIds = useWishlistStore((state) => state.productIds);
  const removeFromWishlist = useWishlistStore((state) => state.remove);
  const clearWishlist = useWishlistStore((state) => state.clear);
  const addItem = useCartStore((state) => state.addItem);

  const [stockFilter, setStockFilter] = useState<StockFilter>("all");

  const wishlistProducts = productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  if (wishlistProducts.length === 0) {
    return <EmptyState title={t("pages.wishlist")} description={t("empty.wishlist")} />;
  }

  const isInStock = (product: Product) =>
    product.leadTime.startsWith("Ready-Made");

  const inStockCount = wishlistProducts.filter(isInStock).length;
  const madeToOrderCount = wishlistProducts.length - inStockCount;

  const filteredProducts = wishlistProducts.filter((product) => {
    if (stockFilter === "in-stock") return isInStock(product);
    if (stockFilter === "made-to-order") return !isInStock(product);
    return true;
  });

  const estimatedTotal = wishlistProducts.reduce(
    (total, product) => total + product.price,
    0,
  );
  const currency = wishlistProducts[0]?.currency ?? "USD";
  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-LB" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(value);

  const addProductToCart = (product: Product) => {
    const color = product.colors[0];
    const material = product.materialOptions[0];

    addItem({
      id: getCartItemId(product.id, color.name, material),
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      currency: product.currency,
      color: color.name,
      material,
      quantity: 1,
    });
  };

  const handleAddToCart = (product: Product) => {
    addProductToCart(product);
    toast.success(tProduct("addedToCart", { quantity: 1, name: product.name }));
  };

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(addProductToCart);
    toast.success(
      tWishlist("addedAllToCart", { count: wishlistProducts.length }),
    );
  };

  const handleRemove = (product: Product) => {
    removeFromWishlist(product.id);
    toast.success(tProduct("removedFromWishlist", { name: product.name }));
  };

  const handleClearAll = () => {
    clearWishlist();
    toast.success(tWishlist("clearedAll"));
  };

  const filters: { label: string; value: StockFilter }[] = [
    { label: `${tWishlist("filters.all")} (${wishlistProducts.length})`, value: "all" },
    { label: `${tWishlist("filters.inStock")} (${inStockCount})`, value: "in-stock" },
    {
      label: `${tWishlist("filters.madeToOrder")} (${madeToOrderCount})`,
      value: "made-to-order",
    },
  ];

  const perks = [
    { icon: Truck, key: "delivery" },
    { icon: RotateCcw, key: "trial" },
    { icon: ShieldCheck, key: "warranty" },
  ] as const;

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
          {t("navigation.wishlist")}
        </span>
      </nav>

      <div className="flex flex-col gap-5 border-b border-outline-warm pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="flex flex-wrap items-center gap-3 font-heading text-3xl text-brand-forest sm:text-4xl">
            {t("pages.wishlist")}
            <span className="rounded-full bg-surface-stone px-3 py-1 text-xs font-semibold text-brand-walnut">
              {tWishlist("savedCount", { count: wishlistProducts.length })}
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-ink-secondary">
            {tWishlist("description")}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs font-medium text-ink-secondary underline-offset-2 transition-colors hover:text-status-error hover:underline"
          >
            {tWishlist("clearAll")}
          </button>
          <StoreButton type="button" onClick={handleAddAllToCart} className="min-h-10 gap-1.5 px-5">
            {tWishlist("addAllToCart")}
          </StoreButton>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter saved items"
          className="flex max-w-full gap-2 overflow-x-auto pb-1"
        >
          {filters.map((filter) => {
            const isActive = stockFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setStockFilter(filter.value)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-walnut",
                  isActive
                    ? "border-brand-forest bg-brand-forest text-surface-white"
                    : "border-outline-warm bg-surface-white text-brand-forest hover:border-brand-sand",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
          {tWishlist("estimatedTotal")}:{" "}
          <span className="text-brand-forest">{formatPrice(estimatedTotal)}</span>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <WishlistCard
            key={product.id}
            product={product}
            locale={locale}
            onRemove={() => handleRemove(product)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 rounded-xl border border-outline-warm bg-surface-stone p-6 sm:grid-cols-3">
        {perks.map(({ icon: Icon, key }) => (
          <div key={key} className="flex items-start gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-brand-walnut" strokeWidth={1.7} />
            <div>
              <p className="text-sm font-semibold text-brand-forest">
                {tWishlist(`perks.${key}.title`)}
              </p>
              <p className="mt-1 text-xs text-ink-secondary">
                {tWishlist(`perks.${key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
