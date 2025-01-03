"use client";

import { BookListType } from "@/app/types/BookListType";
import { getBooksList, getFavoriteBooksList } from "@api/apiBooks";
import { BookList } from "@components/book";
import { Button } from "@components/button";
import { Pagination } from "@components/pagination";
import { Spinner } from "@components/spinner";
import { useFilter } from "@contexts/FilterContext";
import { useUser } from "@contexts/UserContext";
import { faBook, faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "@hooks/useFetch";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { mutate } from "swr";

export default function Home() {
  const t = useTranslations("common");
  const { appliedFilters, page, setPage, clearFilters } = useFilter();
  const { title, author, genre, publicationYear, minRating, maxRating } =
    appliedFilters;
  const [showFavorites, setShowFavorites] = useState(false);
  const { user } = useUser();
  const fetcher = showFavorites
    ? () => getFavoriteBooksList(page, 10, appliedFilters)
    : () => getBooksList(page, 10, appliedFilters);
  const swrKey = `${title},${author},${genre},${publicationYear},${minRating},${maxRating},${page}`;
  const { data: bookData, isLoading } = useFetch<BookListType>(swrKey, fetcher);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    clearFilters();
  };

  useEffect(() => {
    mutate(swrKey);
  }, [showFavorites, swrKey]);

  if (isLoading) {
    return <Spinner />;
  }

  if (bookData) {
    return (
      <div className="space-y-4">
        {user && (
          <Button
            label={showFavorites ? t("allBooks") : t("favouriteBooks")}
            onClick={toggleFavorites}
            variant={showFavorites ? "good" : "warning"}
            className="w-max"
            icon={
              <FontAwesomeIcon
                icon={showFavorites ? faBook : faBookBookmark}
                size="lg"
              />
            }
          />
        )}
        <BookList
          data={bookData}
          heading={t("bookList")}
          showHidden={showFavorites}
        />
        <Pagination
          page={page}
          onPageChange={handlePageChange}
          hasNextPage={bookData.totalPages !== page}
        />
      </div>
    );
  }
}
