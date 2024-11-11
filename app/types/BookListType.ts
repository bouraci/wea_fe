export type BookListItemType = {
  id: number;
  title: string;
  subtitle: string;
  authors: string;
  genre: string;
  coverImageUrl: string;
  publicationYear: number;
  rating: number;
  totalRatings: number;
  isHidden: boolean;
  isFavorite: boolean;
};

export type BookListType = {
  totalRecords: number;
  totalPages: number;
  page: number;
  pageSize: number;
  books: BookListItemType[];
};
