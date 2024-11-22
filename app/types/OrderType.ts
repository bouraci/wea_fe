import { BookListItemType } from "@/app/types/BookListType";

export interface OrderType {
  id: number;
  books: BookListItemType[];
  created: string;
  totalPrice: number;
}
