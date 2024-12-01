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

  if (isLoading) {
    return <Spinner />;
  }

  if (data) {
    return (
      <div className="space-y-4">
        {data.map((order) => (
          <div
            className="grid grid-cols-[1fr_2fr_auto_3fr_1fr] gap-4 items-center p-4 border border-zinc-400 rounded-lg card-list-item"
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
            <p className="font-bold text-center">{order.totalPrice},-</p>
          </div>
        ))}
      </div>
    );
  }
}
