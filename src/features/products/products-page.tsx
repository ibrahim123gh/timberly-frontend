import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/shared/empty-state";

export function ProductsPage() {
  const t = useTranslations();
  return <EmptyState title={t("pages.products")} description={t("empty.products")} />;
}
