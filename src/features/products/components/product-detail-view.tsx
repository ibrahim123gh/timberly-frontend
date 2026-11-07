"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(
    product.materialOptions[0],
  );

  const handleToggleWishlist = () => {
    const next = !isWishlisted;
    setIsWishlisted(next);
    toast.success(
      t(next ? "addedToWishlist" : "removedFromWishlist", {
        name: product.name,
      }),
    );
  };

  const handleAddToCart = () => {
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
