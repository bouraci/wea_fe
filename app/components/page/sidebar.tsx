"use client";

import { BookFilter } from "@components/filter";
import { LocaleSwitcher } from "@components/locale";
import { UserChip } from "@components/user/user-chip";
import { usePathname } from "next/navigation";
import { UserSidebarWrapper } from "@components/user";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@contexts/CartContext";
import { useTranslations } from "next-intl";

export function Sidebar() {
  const path = usePathname();
  const { cart } = useCart();
  const t = useTranslations("cart");

  return (
    <div className="h-screen max-w-sm w-full bg-zinc-800 p-4 flex flex-col">
      <Link
        href="/cart"
        className="mb-6 font-bold hover:bg-zinc-700 transition-all duration-200 hover:cursor-pointer flex gap-2 p-4 border border-zinc-400 rounded-lg"
      >
        <FontAwesomeIcon icon={faBasketShopping} size="lg" />
        {t("shoppingCart")} (
        {cart.reduce((total, item) => total + item.quantity, 0)})
      </Link>

      {path.startsWith("/user") ? <UserSidebarWrapper /> : <BookFilter />}

      <div className="mt-auto flex flex-col gap-6">
        <LocaleSwitcher />
        <UserChip />
      </div>
    </div>
  );
}
