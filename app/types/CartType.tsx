import { BookType } from "@/app/types/BookType";

export type CartItemType = {
  book: BookType;
  quantity: number;
};

export type CartType = {
  items: CartItemType[];
  total: number;
};
