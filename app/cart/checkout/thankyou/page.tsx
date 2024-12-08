"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();

  return (
    <div className="mx-auto my-auto space-y-4 flex-col flex justify-center items-center">
      <div className="text-center font-bold text-lg">
        <p>Thank you for your order nr. {searchParams.get("orderId")}</p>
        <p>The order is being prepare for shipping</p>
      </div>

      <Image
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSBeA6hkc6hfSYp9Wp5UsiUDC2cOZdIIwX1WYtXDTUI5vdtsTmMHpRKg-vBTqufniVlt5v60KUlozv0gWcppabGpepAMqsZc_upMD7WctJwd9O4Y3iXtwV6LPfetVIKNkrOGbUTXVhYagi/s800/book_yoko.png"
        alt="Thank You!"
        height={300}
        width={300}
        loading="eager"
      />

      <Link className="text-center w-1/2 button button--default" href="/">
        Home
      </Link>
    </div>
  );
}
