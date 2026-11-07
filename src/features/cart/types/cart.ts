export type CartLineItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  color: string;
  material: string;
  quantity: number;
};

export function getCartItemId(
  productId: string,
  color: string,
  material: string,
) {
  return `${productId}__${color}__${material}`;
}
