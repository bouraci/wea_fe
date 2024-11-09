import clsx from "clsx";
import { SelectHTMLAttributes } from "react";

type Props = {
  label: string;
  className?: string;
  labelRight?: boolean;
  labelInline?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function LabeledSelect({
  label,
  labelRight,
  labelInline,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "w-full flex",
        labelInline ? "items-center gap-2" : "flex-col gap-1",
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
      <select {...props}>{props.children}</select>
    </div>
  );
}
