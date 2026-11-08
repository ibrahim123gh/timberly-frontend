import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  productIds: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      productIds: [],
      toggle: (id) =>
        set((state) => ({
          productIds: state.productIds.includes(id)
            ? state.productIds.filter((productId) => productId !== id)
            : [...state.productIds, id],
        })),
      remove: (id) =>
        set((state) => ({
          productIds: state.productIds.filter((productId) => productId !== id),
        })),
      clear: () => set({ productIds: [] }),
    }),
    { name: "timberly-wishlist" },
  ),
);

export function useWishlistCount() {
  return useWishlistStore((state) => state.productIds.length);
}

export function useIsWishlisted(productId: string) {
  return useWishlistStore((state) => state.productIds.includes(productId));
}
