import { BookType } from "@/app/types/BookType";
import Link from "next/link";
import Image from "next/image";

export function BookListItem({ book }: { book: BookType }) {
    return (
        <Link href={`/books/${book.id}`}
            className="hover:bg-white/10 transition-all duration-200 hover:cursor-pointer flex gap-3 justify-between p-4 border border-zinc-400
            rounded-xl card-list-item"
        >
            <div className="flex gap-4">
                <Image src="https://placehold.co/400x600/000000/FFFFFF/png" className="rounded-lg" alt={book.title} height={200} width={100} />
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-2xl">{book.title}</p>
                    <p className="italic">{book.authors}</p>
                    <p>{book.publisher}</p>
                    <p>{book.publishedDate.split("-", 1)}</p>
                </div>
            </div>
        </Link>
    );
}
