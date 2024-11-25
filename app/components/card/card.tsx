import { ReactNode } from "react";

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
    <div className="bg-zinc-700 p-4 rounded-lg flex flex-col gap-4">
      <div>
        {heading && <h3>{heading}</h3>}
        {subheading && <small>{subheading}</small>}
      </div>

      <div className={className}>{children}</div>
    </div>
  );
}
