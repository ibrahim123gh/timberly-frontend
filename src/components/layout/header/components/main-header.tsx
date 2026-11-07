"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";
import {
  Font12WhiteMedium,
} from "@/components/shared/typography";

type MainHeaderProps = {
  locale?: "en" | "ar";
  cartCount?: number;
  wishlistCount?: number;
};

export function MainHeader({
  locale = "en",
  cartCount = 0,
  wishlistCount = 0,
}: MainHeaderProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setHidden(false);
      } else if (currentScrollY > previousScrollY) {
        setHidden(true);
      } else if (currentScrollY < previousScrollY) {
        setHidden(false);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 border-b border-outline-warm bg-surface-white transition-transform duration-200 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="page-gutter flex h-18 flex-wrap items-center justify-between gap-x-5 gap-y-3 py-3 lg:flex-nowrap">
        <Link
          href={`/${locale}`}
          aria-label="Ghourani Woodwork & Furniture home"
          className=""
        >
          <Image
            src="/logo.png"
            alt="Ghourani Woodwork & Furniture"
            width={2172}
            height={724}
            priority
            className="h-auto object-cover w-40 sm:w-60"
          />
        </Link>

        <form
          action={`/${locale}/products`}
          method="get"
          role="search"
          className="order-3 flex h-11 w-full max-w-[650px] items-center gap-3 rounded-full border border-outline-warm bg-surface-warm-white py-1 pl-3 pr-1 focus-within:ring-2 focus-within:ring-brand-walnut/30 lg:order-none lg:min-w-0 lg:flex-1"
        >
          <Search
            className="size-4 shrink-0 text-ink-secondary"
            aria-hidden="true"
          />

          <input
            type="search"
            name="search"
            aria-label="Search furniture"
            placeholder="Search furniture, dining tables, armchairs, storage..."
            className="min-w-0 flex-1 bg-transparent text-xs text-ink-body outline-none placeholder:font-sans placeholder:text-[12px] placeholder:font-medium placeholder:leading-[16.5px] placeholder:tracking-[0.55px] placeholder:text-ink-secondary"
          />

          <button
            type="submit"
            className="h-8 shrink-0 flex items-center justify-center rounded-full bg-brand-forest px-4 transition-colors hover:bg-brand-walnut"
          >
            <Font12WhiteMedium>SEARCH</Font12WhiteMedium>
          </button>
        </form>

        <div className="ms-auto flex shrink-0 items-center gap-4 text-[11px] text-ink-deep-ink lg:ms-0">
          <button
            type="button"
            disabled
            title="Account will be available soon"
            aria-label="Account"
            className="flex items-center gap-1 disabled:cursor-not-allowed"
          >
            <UserRound className="size-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Account</span>
          </button>

          <Link
            href={`/${locale}/wishlist`}
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="flex items-center gap-1 transition-colors hover:text-brand-walnut"
          >
            <span className="relative">
              <Heart className="size-[18px]" strokeWidth={1.8} />

              {wishlistCount > 0 && (
                <span className="absolute -end-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-brand-sand text-[8px] font-semibold leading-none text-surface-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </span>

            <span className="hidden sm:inline">Saved</span>
          </Link>

          <Link
            href={`/${locale}/cart`}
            aria-label={`Shopping cart, ${cartCount} items`}
            className="flex h-7 items-center gap-2 rounded-full bg-brand-forest px-3 text-surface-white transition-colors hover:bg-brand-walnut"
          >
            <ShoppingBag className="size-3.5" strokeWidth={1.8} />

            <span>Cart</span>

            {cartCount > 0 && (
              <span className="flex size-3.5 items-center justify-center rounded-full bg-brand-sand text-[8px] font-semibold leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
