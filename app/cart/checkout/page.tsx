"use client";

import { Card } from "@components/card";
import { useFetch } from "@hooks/useFetch";
import { getUserDetails } from "@api/apiUser";
import { UserDetailDataType } from "@/app/types/UserType";
import { Spinner } from "@components/spinner";
import { useUser } from "@contexts/UserContext";
import { UserDetailsForm } from "@components/user/user-detail";
import { ShoppingCartItems } from "@components/shopping-cart";
import { useCart } from "@contexts/CartContext";
import { Button } from "@components/button";
import { postMakeOrder } from "@api/apiOrders";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { user } = useUser();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { data: userData, isLoading } = useFetch<UserDetailDataType>(
    "orderUserData",
    getUserDetails,
  );

  async function handleOrder() {
    const response = await postMakeOrder(cart);

    if (response) {
      toast.success("Order successful");
      clearCart();
      router.push("/");
    } else {
      toast.error("Order failed");
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (userData && user) {
    if (
      userData.processData === null ||
      userData.address === null ||
      userData.billingAddress === null ||
      userData.birthDay === null
    ) {
      return (
        <UserDetailsForm
          swrKey="orderUserData"
          userData={{ user, ...userData }}
        />
      );
    }

    return (
      <div className="space-y-4">
        <Card className="space-y-2">
          <div>
            <h3>Delivery address</h3>
            <p>{user.name}</p>
            <p>{userData.address.streetAddress}</p>
            <p>{userData.address.city}</p>
            <p>{userData.address.zip}</p>
            <p>{userData.address.country}</p>
          </div>

          <div>
            <h3>Billing address</h3>
            <p>{userData.billingAddress.streetAddress}</p>
            <p>{userData.billingAddress.city}</p>
            <p>{userData.billingAddress.zip}</p>
            <p>{userData.billingAddress.country}</p>
          </div>
        </Card>
        <ShoppingCartItems cart={cart} checkout={true} />
        <Button
          onClick={handleOrder}
          className="mx-auto max-w-sm"
          label="Finish order"
        />
      </div>
    );
  }
}
