"use client";

import {getBooksList} from "@api/fetchers";
import {Spinner} from "@components/spinner";
import {BookList} from "@components/book";
import {useFetch} from "@hooks/useFetch";
import {BookListType} from "@/app/types/BookListType";
import {useState} from "react";
import {Pagination} from "@components/pagination";
import {useFilter} from "@contexts/FilterContext";

export default function Home() {
  const { appliedFilters } = useFilter();
  const { title, author, genre, publicationYear, minRating, maxRating } = appliedFilters;
  const [page, setPage] = useState(1);

  const { data: bookData, isLoading } = useFetch<BookListType>(
      `/api/books?title=${title}&author=${author}&genre=${genre}&publicationYear=${publicationYear}&minRating=${minRating}&maxRating=${maxRating}&page=${page}`,
      () => getBooksList(page, 10, appliedFilters)
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
      return <Spinner />;
  }

  if (bookData) {
    return (
        <>
          <BookList data={bookData} />
          <Pagination page={page} onPageChange={handlePageChange} hasNextPage={bookData.totalPages !== page} />
        </>
    );
  }
}
