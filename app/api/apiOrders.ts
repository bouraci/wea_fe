import { authFetch } from "@utils/authFetch";
import { CartItemType } from "@/app/types/CartType";

export async function getUserOrders() {
  const response = await authFetch("/api/order/orders", {
    method: "GET",
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function postMakeOrder(
  order: CartItemType[],
  paymentMethod: number,
) {
  const response = await authFetch("/api/order/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookIds: order.flatMap((bookOrder) =>
        Array(bookOrder.quantity).fill(bookOrder.book.id),
      ),
      paymentMethod: paymentMethod,
    }),
  });

  return response.ok;
}
