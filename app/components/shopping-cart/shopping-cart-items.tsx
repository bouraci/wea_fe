import { BookOrderListItem } from "@components/book";
import Link from "next/link";
import { Card } from "@components/card";
import { CartType } from "@/app/types/CartType";
import { useTranslations } from "next-intl";

export function ShoppingCartItems({
  cart,
  checkout,
  additionalCost = 0,
}: {
  cart: CartType;
  checkout?: boolean;
  additionalCost?: number;
}) {
  const t = useTranslations("cart");
  return (
    <Card heading={t("cartContent")}>
      {cart.items.length === 0 ? (
        <p className="text-center font-bold text-lg py-2">{t("cartEmpty")}</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <BookOrderListItem
              noButtons={checkout}
              key={item.book.id}
              item={item}
            />
          ))}

          <div className="flex items-center justify-between">
            <div className="space-y-2">
              {additionalCost > 0 && (
                <>
                  <p className="text-xl">{t("fees")}:</p>
                  <p className="font-bold text-2xl">
                    {additionalCost.toFixed(2)},-
                  </p>
                </>
              )}
              <p className="text-xl">{t("orderTotal")}:</p>
              <p className="font-bold text-2xl">
                {(cart.total + additionalCost).toFixed(2)},-
              </p>
            </div>

            {!checkout && (
              <Link href="/cart/checkout" className="button button--default">
                {t("orderContinue")}
              </Link>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
