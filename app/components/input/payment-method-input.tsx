"use client";

import { useState } from "react";
import { Card } from "@components/card";
import { useTranslations } from "next-intl";

type PaymentMethod = 1 | 2 | 3;

export function PaymentMethodInput({
  onPaymentChange,
}: {
  onPaymentChange: (method: PaymentMethod, additionalCost: number) => void;
}) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(2);
  const t = useTranslations("payment");
  const handleMethodChange = (method: PaymentMethod) => {
    setSelectedMethod(method);
    let additionalCost = 0;

    if (method === 3) {
      additionalCost = 0.01;
    } else if (method === 1) {
      additionalCost = 50;
    }

    onPaymentChange(method, additionalCost);
  };

  return (
    <Card className="flex flex-col gap-4" heading={t("paymentMethod")}>
      <label>
        <input
          className="mr-2"
          type="radio"
          name="paymentMethod"
          value="card"
          checked={selectedMethod === 3}
          onChange={() => handleMethodChange(3)}
        />
        {t("card")}
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          name="paymentMethod"
          value="bank"
          checked={selectedMethod === 2}
          onChange={() => handleMethodChange(2)}
        />
        {t("bank")}
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          name="paymentMethod"
          value="delivery"
          checked={selectedMethod === 1}
          onChange={() => handleMethodChange(1)}
        />
        {t("onDelivery")}
      </label>
    </Card>
  );
}
