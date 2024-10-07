"use client";

import {getBooksList} from "@api/fetchers";
import {BookType} from "@/app/types/BookType";
import {Spinner} from "@components/spinner";
import {BookList} from "@components/book";
import {useFetch} from "@hooks/useFetch";

export default function Home() {
  const { data: bookData, isLoading } = useFetch<BookType[]>(
      `/api/books`,
      () => getBooksList()
  );

  if (isLoading) {
      return <Spinner />;
  }

  if (bookData) {
    return <BookList data={bookData} />;
  }
}
