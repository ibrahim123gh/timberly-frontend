import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "../types/order";

type OrdersState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  findOrder: (orderNumber: string) => Order | undefined;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
      findOrder: (orderNumber) =>
        get().orders.find(
          (order) =>
            order.orderNumber.toLowerCase() ===
            orderNumber.trim().toLowerCase(),
        ),
    }),
    { name: "timberly-orders" },
  ),
);
