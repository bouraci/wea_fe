import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type Props = {
  label: string;
  className?: string;
  labelRight?: boolean;
  labelInline?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function LabeledInput({
  label,
  labelRight,
  labelInline,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "w-full flex gap-2",
        labelInline ? "items-center" : "flex-col",
      )}
    >
      <label
        className={clsx(
          "whitespace-nowrap",
          labelRight ? "text-right" : "text-left",
        )}
        htmlFor={props.id}
      >
        {label}
      </label>
      <input className="w-full" {...props} />
    </div>
  );
}
