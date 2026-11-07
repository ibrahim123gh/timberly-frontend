import { ProductDetailsPage } from "@/features/products/product-details-page";

export default async function Page(props: PageProps<"/[locale]/products/[slug]">) {
  const { slug } = await props.params;
  return <ProductDetailsPage slug={slug} />;
}
