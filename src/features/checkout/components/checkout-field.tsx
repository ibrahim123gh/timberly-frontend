"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { CheckoutFormValues } from "../schema";

type CheckoutFieldProps = {
  name: keyof CheckoutFormValues;
  label: string;
  type?: string;
  placeholder?: string;
  optionalLabel?: string;
  className?: string;
  as?: "input" | "textarea";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  maxLength?: number;
};

export function CheckoutField({
  name,
  label,
  type = "text",
  placeholder,
  optionalLabel,
  className,
  as = "input",
  autoComplete,
  inputMode,
  maxLength,
}: CheckoutFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();
  const error = errors[name]?.message as string | undefined;

  const fieldClassName = cn(
    "w-full rounded-lg border border-outline-warm bg-surface-warm-white px-3.5 py-2.5 text-sm text-ink-body outline-none transition-colors placeholder:text-ink-muted focus-visible:border-brand-walnut focus-visible:ring-2 focus-visible:ring-brand-walnut/20",
    as === "textarea" && "min-h-20 resize-none",
    error && "border-status-error",
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label
          htmlFor={name}
          className="text-[11px] font-semibold uppercase tracking-wide text-ink-secondary"
        >
          {label}
        </label>
        {optionalLabel && (
          <span className="text-[10px] uppercase tracking-wide text-ink-muted">
            {optionalLabel}
          </span>
        )}
      </div>

      {as === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={fieldClassName}
          {...register(name)}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          className={fieldClassName}
          {...register(name)}
        />
      )}

      {error && <p className="text-[11px] text-status-error">{error}</p>}
    </div>
  );
}
