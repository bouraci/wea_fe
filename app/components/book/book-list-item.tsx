import { BookType } from "@/app/types/BookType";
import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";
import {Rating} from "@components/rating";

export function BookListItem({ book }: { book: BookType }) {
    return (
        <Link
            href={`/books/${book.id}`}
            className="hover:bg-white/10 transition-all duration-200 hover:cursor-pointer flex gap-3 justify-between p-4 border border-zinc-400 rounded-xl card-list-item"
        >
            <div className="flex gap-4">
                <Image
                    src={book.coverImageUrl.length === 0 ? PLACEHOLDER_BOOK_COVER_URL : book.coverImageUrl}
                    className="rounded-lg object-contain"
                    alt={book.title}
                    height={100}
                    width={100}
                />
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-2xl">{book.title}</p>
                    <p className="italic">{book.authors.split(";").join(", ")}</p>
                    <p>{book.publicationYear}</p>
                    <span className="flex gap-2 items-center">
                        <Rating value={book.rating}/>
                        <p>({book.totalRatings})</p>
                    </span>
                    <p className="line-clamp-3 overflow-hidden text-ellipsis text-zinc-300">{book.description}</p>
                </div>
            </div>
        </Link>
    );
}
