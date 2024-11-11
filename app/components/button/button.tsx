import "./style.css";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactElement } from "react";

type Props = (
  | { label: string; icon?: ReactElement }
  | { label?: string; icon: ReactElement }
) &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "good" | "bad" | "warning" | "gray";
    className?: string;
  };

export function Button({ label, variant, icon, className, ...props }: Props) {
  return (
    <button
      className={clsx(
        "text-white flex items-center justify-center p-2 h-max w-full",
        `button--${props.disabled ? "disabled" : (variant ?? "default")}`,
        className,
      )}
      {...props}
    >
      <span className="flex gap-2 items-center">
        {icon && icon}
        {label}
      </span>
    </button>
  );
}
