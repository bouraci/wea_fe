"use client";

import { useFetch } from "@hooks/useFetch";
import { OrderType } from "@/app/types/OrderType";
import { Spinner } from "@components/spinner";
import { getUserOrders } from "@api/apiOrders";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";

export default function UserOrdersPage() {
  const { data, isLoading } = useFetch<OrderType[]>(
    "userOrders",
    getUserOrders,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (data) {
    return (
      <div className="space-y-4">
        {data.map((order) => (
          <div
            className="items-center flex justify-between p-4 border border-zinc-400 rounded-lg card-list-item"
            key={order.id}
          >
            <p className="font-bold">{order.id}</p>
            <p>{new Date(order.created).toLocaleString("cs-CZ")}</p>
            <div className="flex gap-2">
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
                    height={80}
                    width={80}
                  />
                </Link>
              ))}
            </div>

            <p className="font-bold">{order.totalPrice},-</p>
          </div>
        ))}
      </div>
    );
  }
}
