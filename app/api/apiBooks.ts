import { BookListType } from "@/app/types/BookListType";
import { BookType } from "@/app/types/BookType";
import { authFetch } from "@utils/authFetch";
import { tokenManager } from "@utils/tokenManager";

export async function getBooksList(
  page: number = 1,
  pageSize: number = 10,
  filters: {
    title?: string;
    author?: string;
    genre?: string;
    publicationYear?: string;
    minRating?: string;
    maxRating?: string;
    minPrice?: string;
    maxPrice?: string;
  } = {},
) {
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...filters,
  });

  const response = await fetch(`/api/books?${queryParams.toString()}`, {
    method: "GET",
  });

  return await response.json();
}

export async function getFavoriteBooksList(
  page: number = 1,
  pageSize: number = 10,
  filters: {
    title?: string;
    author?: string;
    genre?: string;
    publicationYear?: string;
    minRating?: string;
    maxRating?: string;
    minPrice?: string;
    maxPrice?: string;
  } = {},
) {
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...filters,
  });

  const response = await authFetch(
    `/api/books/favourites?${queryParams.toString()}`,
    {
      method: "GET",
    },
  );

  return await response.json();
}

export async function getBookDetail(id: number) {
  const response = await fetch(`/api/books/${id}`, {
    method: "GET",
  });

  const bookDetail = (await response.json()) as BookType;
  bookDetail.isFavorite = false;

  if (!tokenManager.isTokenValid()) {
    return bookDetail;
  }

  const favResponse = (await getFavoriteBooksList(1, 1, {
    title: bookDetail?.title,
    author: bookDetail?.authors,
    genre: bookDetail?.genre,
    publicationYear: String(bookDetail?.publicationYear),
  })) as BookListType;

  if (favResponse.totalRecords === 1) {
    bookDetail.isFavorite = true;
  }

  return bookDetail;
}

export async function addBookToFavorites(id: number) {
  const response = await authFetch(`/api/books/favourites/${id}`, {
    method: "POST",
  });

  return response.ok;
}

export async function deleteBookFromFavorites(id: number) {
  const response = await authFetch(`/api/books/favourites/${id}`, {
    method: "DELETE",
  });

  return response.ok;
}

export async function getAllBookGenres() {
  const response = await fetch(`/api/books/genres`, {
    method: "GET",
  });

  return await response.json();
}
