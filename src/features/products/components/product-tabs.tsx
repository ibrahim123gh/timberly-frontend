import { useTranslations } from "next-intl";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { Product } from "../types/product";

type ProductTabsProps = {
  product: Product;
};

export function ProductTabs({ product }: ProductTabsProps) {
  const t = useTranslations("product");

  const specRows = [
    { label: t("frameMaterial"), value: product.materialOptions[0] },
    { label: t("timberSpecies"), value: product.timberSpecies },
    { label: t("joinery"), value: product.joinery },
    {
      label: t("dimensions"),
      value: `${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height}`,
    },
    { label: t("leadTime"), value: product.leadTime },
    { label: t("sku"), value: product.sku },
  ];

  return (
    <section className="mt-10 rounded-xl border border-outline-warm bg-surface-white p-6 sm:p-8">
      <Tabs defaultValue="description">
        <TabsList variant="line" className="h-auto gap-6 border-b border-outline-warm p-0">
          <TabsTrigger
            value="description"
            className="h-auto flex-none rounded-none border-0 px-0 pb-3 text-sm font-semibold text-ink-secondary data-active:text-brand-forest"
          >
            {t("descriptionTab")}
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="h-auto flex-none rounded-none border-0 px-0 pb-3 text-sm font-semibold text-ink-secondary data-active:text-brand-forest"
          >
            {t("specificationsTab")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-6">
          <div className="space-y-4 text-sm leading-6 text-ink-body">
            {product.fullDescription.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="pt-6">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {specRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-outline-warm/60 pb-2 text-sm"
              >
                <dt className="text-ink-secondary">{row.label}</dt>
                <dd className="font-medium text-ink-deep">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-walnut">
                {t("detailsConstruction")}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-body">
                {product.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand-sand" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-walnut">
                {t("careShipping")}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-body">
                {product.careInstructions.map((instruction) => (
                  <li key={instruction} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand-sand" />
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
