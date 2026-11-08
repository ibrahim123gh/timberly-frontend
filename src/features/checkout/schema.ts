import { z } from "zod";

export const checkoutSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z.string().trim().min(7, "Enter a valid phone number"),
    country: z.string().min(1, "Select a country"),
    city: z.string().trim().min(1, "Enter a city"),
    area: z.string().trim().min(1, "Enter an area or district"),
    street: z.string().trim().min(1, "Enter a street address"),
    apartment: z.string().trim().optional(),
    deliveryNotes: z.string().trim().optional(),
    paymentMethod: z.enum(["card", "cash"]),
    cardNumber: z.string().trim().optional(),
    cardName: z.string().trim().optional(),
    cardExpiry: z.string().trim().optional(),
    cardCvv: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "card") return;

    if ((data.cardNumber ?? "").replace(/\s/g, "").length < 15) {
      ctx.addIssue({
        code: "custom",
        path: ["cardNumber"],
        message: "Enter a valid card number",
      });
    }
    if (!data.cardName || data.cardName.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["cardName"],
        message: "Enter the name on the card",
      });
    }
    if (!/^\d{2}\/\d{2}$/.test(data.cardExpiry ?? "")) {
      ctx.addIssue({
        code: "custom",
        path: ["cardExpiry"],
        message: "Use MM/YY format",
      });
    }
    if (!/^\d{3,4}$/.test(data.cardCvv ?? "")) {
      ctx.addIssue({
        code: "custom",
        path: ["cardCvv"],
        message: "Enter a valid CVV",
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
