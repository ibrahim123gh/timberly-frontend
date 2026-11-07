import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLineItem } from "../types/cart";

const MAX_QUANTITY = 99;

type AddItemInput = Omit<CartLineItem, "quantity"> & { quantity?: number };

type CartState = {
  items: CartLineItem[];
  addItem: (item: AddItemInput) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const quantity = Math.min(item.quantity ?? 1, MAX_QUANTITY);
          const existing = state.items.find((line) => line.id === item.id);

          if (existing) {
            return {
              items: state.items.map((line) =>
                line.id === item.id
                  ? {
                      ...line,
                      quantity: Math.min(
                        line.quantity + quantity,
                        MAX_QUANTITY,
                      ),
                    }
                  : line,
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((line) => line.id !== id),
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.max(1, Math.min(quantity, MAX_QUANTITY)) }
              : line,
          ),
        })),
      incrementItem: (id) =>
        set((state) => ({
          items: state.items.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.min(line.quantity + 1, MAX_QUANTITY) }
              : line,
          ),
        })),
      decrementItem: (id) =>
        set((state) => ({
          items: state.items.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.max(line.quantity - 1, 1) }
              : line,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "timberly-cart" },
  ),
);

export function useCartCount() {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );
}
