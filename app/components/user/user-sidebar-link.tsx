import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  href: string;
  icon: IconProp;
  children: ReactNode;
};

export function UserSidebarLink({ href, icon, children }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`flex gap-2 font-bold items-center py-6 px-4 rounded-lg transition duration-300 border border-blue-500/50 ${
        pathname === href
          ? "bg-blue-500/40"
          : "bg-blue-500/10 hover:bg-blue-500/40"
      }`}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
      {children}
    </Link>
  );
}
