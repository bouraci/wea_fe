"use client";

import { BookType } from "@/app/types/BookType";
import { getBookDetail } from "@api/apiBooks";
import { BookDetail } from "@components/book";
import { Spinner } from "@components/spinner";
import { useFetch } from "@hooks/useFetch";

export default function Book({ params }: { params: { id: number } }) {
  const { id } = params;
  const { data: bookData, isLoading } = useFetch<BookType>(
    `getBooksDetail`,
    () => getBookDetail(id),
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (bookData) {
    return <BookDetail book={bookData} />;
  }
}
