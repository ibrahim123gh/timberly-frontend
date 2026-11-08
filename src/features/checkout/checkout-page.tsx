"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Lock, ShieldCheck } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { useCartStore } from "@/features/cart/store/cart-store";
import { FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE } from "@/features/cart/constants";
import { useOrdersStore } from "@/features/orders/store/orders-store";
import { generateOrderNumber } from "@/features/orders/utils/generate-order-number";
import { checkoutSchema, type CheckoutFormValues } from "./schema";
import { CheckoutProgress } from "./components/checkout-progress";
import { ContactSection } from "./components/contact-section";
import { DeliverySection } from "./components/delivery-section";
import { PaymentSection } from "./components/payment-section";
import { CheckoutOrderSummary } from "./components/checkout-order-summary";

export function CheckoutPage() {
  const t = useTranslations();
  const tCheckout = useTranslations("checkout");
  const locale = useLocale() as "en" | "ar";
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const addOrder = useOrdersStore((state) => state.addOrder);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      area: "",
      street: "",
      apartment: "",
      deliveryNotes: "",
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCvv: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, email, phone, country, city, street] = useWatch({
    control: form.control,
    name: ["fullName", "email", "phone", "country", "city", "street"],
  });

  if (items.length === 0) {
    return <EmptyState title={t("pages.checkout")} description={t("empty.cart")} />;
  }

  const step1Complete = Boolean(fullName && email && phone);
  const step2Complete = Boolean(country && city && street);
  const currentStep = !step1Complete ? 1 : !step2Complete ? 2 : 3;

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const deliveryFee =
      subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
    const orderNumber = generateOrderNumber();

    addOrder({
      orderNumber,
      placedAt: new Date().toISOString(),
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      currency: items[0]?.currency ?? "USD",
      customer: {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
      },
      address: {
        country: values.country,
        city: values.city,
        area: values.area,
        street: values.street,
        apartment: values.apartment,
        notes: values.deliveryNotes,
      },
      paymentMethod: values.paymentMethod,
    });

    clearCart();
    toast.success(tCheckout("successToast"));
    setIsSubmitting(false);
    router.push(`/${locale}/track-order?order=${orderNumber}`);
  });

  return (
    <div className="page-gutter py-8 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 border-b border-outline-warm pb-6 sm:flex-row sm:items-center sm:justify-between">
        <CheckoutProgress
          currentStep={currentStep}
          labels={[
            tCheckout("steps.contact"),
            tCheckout("steps.delivery"),
            tCheckout("steps.payment"),
          ]}
        />

        <div className="flex items-center gap-4 text-xs font-medium text-ink-secondary">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3.5 text-brand-walnut" strokeWidth={1.7} />
            {tCheckout("topBar.secure")}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-brand-walnut" strokeWidth={1.7} />
            {tCheckout("topBar.guarantee")}
          </span>
        </div>
      </div>

      <h1 className="mb-6 font-heading text-3xl text-brand-forest sm:text-4xl">
        {t("pages.checkout")}
      </h1>

      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            <ContactSection />
            <DeliverySection />
            <PaymentSection />
          </div>

          <CheckoutOrderSummary items={items} locale={locale} isSubmitting={isSubmitting} />
        </form>
      </FormProvider>
    </div>
  );
}
