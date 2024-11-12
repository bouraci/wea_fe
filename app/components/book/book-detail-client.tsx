"use client";

import { BookType } from "@/app/types/BookType";
import { getBookDetail } from "@api/apiBooks";
import { BookDetail } from "@components/book/book-detail";
import { Spinner } from "@components/spinner";
import { useFetch } from "@hooks/useFetch";

export function BookDetailClient({ id }: { id: number }) {
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
