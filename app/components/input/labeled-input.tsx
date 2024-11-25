import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

export type LabeledInputProps = {
  label?: string;
  className?: string;
  labelRight?: boolean;
  labelInline?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, labelRight, labelInline, ...props }, ref?) => {
    return (
      <div
        className={clsx(
          "w-full flex",
          labelInline ? "items-center gap-2" : "flex-col gap-1",
        )}
      >
        {label && (
          <label
            className={clsx(
              "whitespace-nowrap",
              labelRight ? "text-right" : "text-left",
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input ref={ref} className="w-full" {...props} />
      </div>
    );
  },
);

LabeledInput.displayName = "LabeledInput";
