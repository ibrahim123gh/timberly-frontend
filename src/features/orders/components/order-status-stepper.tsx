import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_SEQUENCE, type OrderStatus } from "../types/order";

type OrderStatusStepperProps = {
  status: OrderStatus;
  labels: Record<OrderStatus, string>;
};

export function OrderStatusStepper({ status, labels }: OrderStatusStepperProps) {
  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(status);

  return (
    <ol className="flex items-start gap-2 overflow-x-auto pb-1 sm:gap-4">
      {ORDER_STATUS_SEQUENCE.map((step, index) => {
        const isComplete = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <li
            key={step}
            className="flex min-w-[84px] flex-1 flex-col items-center gap-2"
          >
            <div className="flex w-full items-center">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isComplete || isActive
                    ? "bg-brand-forest text-surface-white"
                    : "border border-outline-warm text-ink-secondary",
                )}
              >
                {isComplete ? <Check className="size-3.5" /> : index + 1}
              </span>
              {index < ORDER_STATUS_SEQUENCE.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px flex-1",
                    isComplete ? "bg-brand-forest" : "bg-outline-warm",
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-center text-[11px] font-medium",
                isComplete || isActive ? "text-brand-forest" : "text-ink-secondary",
              )}
            >
              {labels[step]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
