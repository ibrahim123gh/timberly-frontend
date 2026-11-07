export type ProductCategory =
  | "living-room"
  | "bedroom"
  | "dining"
  | "kitchen"
  | "tables";

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductDimensions = {
  width: string;
  height: string;
  depth: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  image: string;
  images?: string[];
  category: ProductCategory;
  subcategory: string;
  description: string;
  longDescription: string;
  fullDescription: string[];
  price: number;
  currency: string;
  badge?: "bestseller" | "custom" | "new";
  colors: ProductColor[];
  materialOptions: string[];
  timberSpecies: string;
  joinery: string;
  leadTime: string;
  dimensions: ProductDimensions;
  sku: string;
  details: string[];
  careInstructions: string[];
};
