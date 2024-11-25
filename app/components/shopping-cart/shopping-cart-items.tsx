import { CartItem } from "@contexts/CartContext";
import { BookOrderListItem } from "@components/book";
import Link from "next/link";
import { Card } from "@components/card";

export function ShoppingCartItems({
  cart,
  checkout,
}: {
  cart: CartItem[];
  checkout?: boolean;
}) {
  return (
    <Card heading="Shopping Cart">
      {cart.length === 0 ? (
        <p className="text-center font-bold text-lg py-2">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <BookOrderListItem
              noButtons={checkout}
              key={item.book.id}
              item={item}
            />
          ))}

          <div className="flex items-center justify-between">
            <p className="font-bold text-2xl">
              {`Order total: 
                ${cart.reduce(
                  (total, item) =>
                    total + item.quantity * (item.book.price ??= 499),
                  0,
                )},-`}
            </p>

            {!checkout && (
              <Link href="/cart/checkout" className="button button--default">
                Order your books
              </Link>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
