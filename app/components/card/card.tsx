import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  heading?: string;
  subheading?: string;
}

export function Card({ children, className, heading, subheading }: Props): ReactNode {
  return (
    <div
      className={clsx("bg-zinc-700 p-4 rounded-xl flex flex-col", className)}
    >
      {heading && <h3>{heading}</h3>}
      {subheading && <small>{subheading}</small>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
