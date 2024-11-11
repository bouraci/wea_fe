import clsx from "clsx";
import "./style.css";

type Props = {
  content: string;
  className?: string;
  variant?: "default" | "good" | "bad" | "warning" | "gray";
  size?: "sm" | "md" | "lg";
};

export function Chip({ content, className, variant, size }: Props) {
  return (
    <span
      className={clsx(
        `chip chip--${variant ?? "default"} chip--${size ?? "sm"}`,
        className,
      )}
    >
      {content}
    </span>
  );
}
