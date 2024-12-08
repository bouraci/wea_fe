"use client";

import { useFetch } from "@hooks/useFetch";
import { OrderType } from "@/app/types/OrderType";
import { Spinner } from "@components/spinner";
import { getUserOrders } from "@api/apiOrders";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faBuildingColumns,
  faTruck,
  IconDefinition,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Chip } from "@components/chip";

export default function UserOrdersPage() {
  const { data, isLoading } = useFetch<OrderType[]>(
    "userOrders",
    getUserOrders,
  );

  function getPaymentMethodIcon(paymentMethod: number | null): IconDefinition {
    switch (paymentMethod) {
      case 1:
        return faTruck;
      case 2:
        return faBuildingColumns;
      case 3:
        return faCreditCard;
      default:
        return faCircleQuestion;
    }
  }

  function getOrderStatusString(
    orderStatus: number | null | undefined,
  ): string {
    switch (orderStatus) {
      case 0:
        return "Processing";
      case 1:
        return "Delivering";
      case 2:
        return "Cancelled";
      case 3:
        return "Completed";
      default:
        return "Unknown";
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (data) {
    return (
      <div className="space-y-4">
        {data.map((order) => (
          <div
            className="grid grid-cols-[1fr_1fr_1fr_1fr_2fr_auto_1fr] gap-4 items-center p-4 border border-zinc-400 rounded-lg card-list-item"
            key={order.id}
          >
            <p className="font-bold text-center">{order.id}</p>
            <p className="text-center">
              {new Date(order.created).toLocaleString("cs-CZ")}
            </p>
            <FontAwesomeIcon
              icon={getPaymentMethodIcon(order.paymentMethod)}
              size="xl"
              className="justify-self-center"
            />
            <Chip content={getOrderStatusString(order.status)} />
            <div>
              {order.userSnapshot ? (
                <div className="text-left flex gap-4">
                  <div>
                    <p>{order.userSnapshot.address.StreetAddress}</p>
                    <p>{order.userSnapshot.address.City}</p>
                    <p>{order.userSnapshot.address.Zip}</p>
                    <p>{order.userSnapshot.address.Country}</p>
                  </div>
                  <div>
                    <p>{order.userSnapshot.billingAddress.StreetAddress}</p>
                    <p>{order.userSnapshot.billingAddress.City}</p>
                    <p>{order.userSnapshot.billingAddress.Zip}</p>
                    <p>{order.userSnapshot.billingAddress.Country}</p>
                  </div>
                </div>
              ) : (
                <p>-</p>
              )}
            </div>
            <div className="flex gap-2 justify-center">
              {order.books.map((book) => (
                <Link href={`/books/${book.id}`} key={book.id}>
                  <Image
                    src={
                      book.coverImageUrl.length === 0
                        ? PLACEHOLDER_BOOK_COVER_URL
                        : book.coverImageUrl
                    }
                    className="rounded-lg object-contain"
                    alt={book.title}
                    height={60}
                    width={60}
                  />
                </Link>
              ))}
            </div>
            <p className="font-bold text-center">
              {order.totalPrice.toFixed(2)},-
            </p>
          </div>
        ))}
      </div>
    );
  }
}
