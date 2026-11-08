"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useCartStore } from "@/features/cart/store/cart-store";
import { getCartItemId } from "@/features/cart/types/cart";
import { useIsWishlisted, useWishlistStore } from "@/features/wishlist/store/wishlist-store";
import { ProductGallery } from "./product-gallery";
import { ProductBuyBox } from "./product-buy-box";
import { ProductTabs } from "./product-tabs";
import type { Product } from "../types/product";

type ProductDetailViewProps = {
  product: Product;
  images: string[];
  locale: "en" | "ar";
};

export function ProductDetailView({
  product,
  images,
  locale,
}: ProductDetailViewProps) {
  const t = useTranslations("product");
  const addItem = useCartStore((state) => state.addItem);
  const isWishlisted = useIsWishlisted(product.id);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(
    product.materialOptions[0],
  );

  const handleToggleWishlist = () => {
    const next = !isWishlisted;
    toggleWishlist(product.id);
    toast.success(
      t(next ? "addedToWishlist" : "removedFromWishlist", {
        name: product.name,
      }),
    );
  };

  const handleAddToCart = () => {
    const selectedColor = product.colors[selectedColorIndex] ?? product.colors[0];
    addItem({
      id: getCartItemId(product.id, selectedColor.name, selectedMaterial),
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: images[0] ?? product.image,
      price: product.price,
      currency: product.currency,
      color: selectedColor.name,
      material: selectedMaterial,
      quantity,
    });
    toast.success(t("addedToCart", { quantity, name: product.name }));
  };

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          product={product}
          images={images}
          isWishlisted={isWishlisted}
          onToggleWishlist={handleToggleWishlist}
        />

        <ProductBuyBox
          product={product}
          locale={locale}
          selectedColorIndex={selectedColorIndex}
          onSelectColor={setSelectedColorIndex}
          selectedMaterial={selectedMaterial}
          onSelectMaterial={setSelectedMaterial}
          quantity={quantity}
          onIncrement={() => setQuantity((value) => Math.min(value + 1, 99))}
          onDecrement={() => setQuantity((value) => Math.max(value - 1, 1))}
          isWishlisted={isWishlisted}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      </div>

      <ProductTabs product={product} />
    </>
  );
}
