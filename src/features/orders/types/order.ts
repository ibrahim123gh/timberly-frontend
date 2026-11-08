import type { CartLineItem } from "@/features/cart/types/cart";

export type OrderStatus = "processing" | "confirmed" | "out-for-delivery" | "delivered";

export type Order = {
  orderNumber: string;
  placedAt: string;
  items: CartLineItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  address: {
    country: string;
    city: string;
    area: string;
    street: string;
    apartment?: string;
    notes?: string;
  };
  paymentMethod: "card" | "cash";
};

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  "processing",
  "confirmed",
  "out-for-delivery",
  "delivered",
];

const STATUS_THRESHOLD_HOURS: Record<OrderStatus, number> = {
  processing: 0,
  confirmed: 1,
  "out-for-delivery": 24,
  delivered: 72,
};

export function getOrderStatus(placedAt: string): OrderStatus {
  const hoursElapsed = (Date.now() - new Date(placedAt).getTime()) / (1000 * 60 * 60);

  let current: OrderStatus = "processing";
  for (const status of ORDER_STATUS_SEQUENCE) {
    if (hoursElapsed >= STATUS_THRESHOLD_HOURS[status]) {
      current = status;
    }
  }
  return current;
}

export function getOrderStatusStepIndex(status: OrderStatus): number {
  return ORDER_STATUS_SEQUENCE.indexOf(status);
}
