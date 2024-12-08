"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const t = useTranslations("order");
  return (
    <div className="mx-auto my-auto space-y-4 flex-col flex justify-center items-center">
      <div className="text-center font-bold text-lg">
        <p>
          {t("orderThankyou")} {searchParams.get("orderId")}
        </p>
        <p>{t("orderThankyouSub")}</p>
      </div>

      <Image
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSBeA6hkc6hfSYp9Wp5UsiUDC2cOZdIIwX1WYtXDTUI5vdtsTmMHpRKg-vBTqufniVlt5v60KUlozv0gWcppabGpepAMqsZc_upMD7WctJwd9O4Y3iXtwV6LPfetVIKNkrOGbUTXVhYagi/s800/book_yoko.png"
        alt="Thank You!"
        height={300}
        width={300}
        loading="eager"
      />

      <Link
        className="text-center whitespace-nowrap button button--default"
        href="/"
      >
        {t("home")}
      </Link>
    </div>
  );
}
