export type BookType = {
  id: number;
  isbN10: string;
  isbN13: string;
  title: string;
  subtitle: string;
  authors: string;
  genre: string;
  coverImageUrl: string;
  description: string;
  publicationYear: number;
  rating: number;
  pageCount: number;
  totalRatings: number;
  comments: BookCommentType[];
};

export type BookCommentType = {
  content: string;
  createdDate: string;
  creatorUserName: string;
  rating: number;
};

export type BookCommentRequestType = {
  content: string;
  bookId: number;
  userName: string;
  rating: number;
};
