"use client";

import { useCart } from "@contexts/CartContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Button } from "@components/button";
import { ShoppingCartItems } from "@components/shopping-cart";

export default function Cart() {
  const { cart, clearCart, cartTotal } = useCart();
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Link href="/" className="button button--good">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
          {t("common.backToList")}
        </Link>
        <Button
          className="w-max"
          variant="bad"
          label={t("cart.emptyCart")}
          icon={<FontAwesomeIcon icon={faTrash} size="lg" />}
          onClick={clearCart}
          disabled={cart.length === 0}
        ></Button>
      </div>
      <ShoppingCartItems cart={{ items: cart, total: cartTotal }} />
    </div>
  );
}
