import { BookType } from "@/app/types/BookType";
import Link from "next/link";

export function BookListItem({ book }: { book: BookType }) {
    return (
        <Link href={`/books/${book.id}`}
            className="hover:bg-white/10 hover:cursor-pointer flex gap-3 justify-between p-4 border border-zinc-400
            rounded-xl card-list-item mb-2"
        >
            <p className="font-bold">{book.title}</p>
            <p>{book.authors}</p>
            <p>{book.publisher}</p>
            <p>{book.publishedDate.split("-", 1)}</p>
        </Link>
    );
}
