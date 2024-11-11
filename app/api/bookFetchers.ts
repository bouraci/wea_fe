import { BookListType } from "@/app/types/BookListType";
import { BookType } from "@/app/types/BookType";

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

  return response.json();
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
  } = {},
  token: string | null,
) {
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...filters,
  });

  const response = await fetch(
    `/api/books/favourites?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
}

export async function getBookDetail(id: number, token: string | null) {
  const response = await fetch(`/api/books/${id}`, {
    method: "GET",
  });

  const bookDetail = (await response.json()) as BookType;

  if (!token) {
    return bookDetail;
  }

  const favResponse = (await getFavoriteBooksList(
    1,
    1,
    {
      title: bookDetail?.title,
      author: bookDetail?.authors,
      genre: bookDetail?.genre,
      publicationYear: String(bookDetail?.publicationYear),
    },
    token,
  )) as BookListType;

  if (favResponse.totalRecords === 1) {
    bookDetail.isFavorite = true;
  }

  return bookDetail;
}

export async function addBookToFavorites(id: number, token: string | null) {
  const response = await fetch(`/api/books/favourites/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
}
