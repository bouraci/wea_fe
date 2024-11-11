"use client";

import { BookType } from "@/app/types/BookType";
import { getBookDetail } from "@api/bookFetchers";
import { BookDetail } from "@components/book";
import { Spinner } from "@components/spinner";
import { useUser } from "@contexts/UserContext";
import { useFetch } from "@hooks/useFetch";

export default function Book({ params }: { params: { id: number } }) {
  const { id } = params;
  const { token } = useUser();
  const { data: bookData, isLoading } = useFetch<BookType>(
    `getBooksDetail`,
    () => getBookDetail(id, token),
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (bookData) {
    return <BookDetail book={bookData} />;
  }
}
