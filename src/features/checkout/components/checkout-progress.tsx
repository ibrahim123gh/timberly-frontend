import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckoutProgressProps = {
  currentStep: 1 | 2 | 3;
  labels: [string, string, string];
};

export function CheckoutProgress({ currentStep, labels }: CheckoutProgressProps) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {labels.map((label, index) => {
        const step = (index + 1) as 1 | 2 | 3;
        const isComplete = step < currentStep;
        const isActive = step === currentStep;

        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            {index > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-6 shrink-0 sm:w-10",
                  isComplete || isActive ? "bg-brand-forest" : "bg-outline-warm",
                )}
              />
            )}
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                  isComplete
                    ? "bg-brand-forest text-surface-white"
                    : isActive
                      ? "border-2 border-brand-forest text-brand-forest"
                      : "border border-outline-warm text-ink-secondary",
                )}
              >
                {isComplete ? <Check className="size-3.5" /> : step}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-semibold uppercase tracking-wide sm:inline",
                  isComplete || isActive ? "text-brand-forest" : "text-ink-secondary",
                )}
              >
                {label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
