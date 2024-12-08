import { BookListItemType } from "@/app/types/BookListType";

export type OrderType = {
  id: number;
  books: BookListItemType[];
  created: string;
  totalPrice: number;
  paymentMethod: number;
  status?: number;
};
