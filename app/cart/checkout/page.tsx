"use client";

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
import { useRef, useState } from "react";
import { PaymentMethodInput } from "@components/input";
import { useTranslations } from "next-intl";

type UserDetailsFormHandle = {
  validateAndSubmit: () => Promise<boolean>;
  handleSubmit: () => void;
};

export default function Checkout() {
  const t = useTranslations("cart");
  const [paymentMethod, setPaymentMethod] = useState(2);
  const [additionalCost, setAdditionalCost] = useState(0);
  const { user } = useUser();
  const { cart, clearCart, cartTotal } = useCart();
  const router = useRouter();
  const { data: userData, isLoading } = useFetch<UserDetailDataType>(
    "orderUserData",
    getUserDetails,
  );

  async function handleOrder() {
    const response = await postMakeOrder(cart, paymentMethod);

    if (response) {
      toast.success(t("orderSuccess"));
      clearCart();
      router.push("/");
    } else {
      toast.error(t("orderFailed"));
    }
  }

  const formRef = useRef<UserDetailsFormHandle>(null);
  async function handleButtonClick() {
    if (formRef.current) {
      const isValid = await formRef.current.validateAndSubmit();
      if (isValid) {
        formRef.current.handleSubmit();
        await handleOrder();
      }
    }
  }

  function handlePaymentChange(method: number, additional: number) {
    setPaymentMethod(method);
    setAdditionalCost(method === 3 ? cartTotal * additional : additional);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (userData && user) {
    return (
      <div className="space-y-4">
        <UserDetailsForm
          ref={formRef}
          userData={{ user, ...userData }}
          checkout={true}
        />
        <ShoppingCartItems
          additionalCost={additionalCost}
          cart={{ items: cart, total: cartTotal }}
          checkout={true}
        />
        <PaymentMethodInput onPaymentChange={handlePaymentChange} />
        <Button
          type="button"
          onClick={handleButtonClick}
          className="mx-auto max-w-sm"
          label={t("finishOrder")}
        />
      </div>
    );
  }
}
