import { SelectHTMLAttributes } from "react";

type Props = {
  label: string;
  className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function LabeledSelect({ label, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-left" htmlFor={props.id}>
        {label}
      </label>
      <select {...props}>{props.children}</select>
    </div>
  );
}
