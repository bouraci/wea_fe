import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  heading?: string;
  subheading?: string;
}

export function Card({
  children,
  className,
  heading,
  subheading,
}: Props): ReactNode {
  return (
    <div className="bg-zinc-700 p-4 rounded-xl flex flex-col">
      {heading && <h3>{heading}</h3>}
      {subheading && <small>{subheading}</small>}
      <div className={clsx("mt-4", className)}>{children}</div>
    </div>
  );
}
