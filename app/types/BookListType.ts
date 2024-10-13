import {BookType} from "@/app/types/BookType";

export type BookListType = {
    totalRecords: number,
    totalPages: number,
    page: number,
    pageSize: number,
    books: BookType[]
}