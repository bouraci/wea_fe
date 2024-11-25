import { authFetch } from "@utils/authFetch";
import { CartItem } from "@contexts/CartContext";

export async function getUserOrders() {
  const response = await authFetch("/api/order/orders", {
    method: "GET",
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function postMakeOrder(order: CartItem[]) {
  const response = await authFetch("/api/order/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookIds: order.map((bookOrder) => bookOrder.book.id),
    }),
  });

  return response.ok;
}
