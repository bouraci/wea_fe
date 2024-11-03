import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";
import {Rating} from "@components/rating";
import {BookListItemType} from "@/app/types/BookListType";
import {Chip} from "@components/chip";

export function BookListItem({ book }: { book: BookListItemType }) {
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
                    {book.genre.length > 0 && <Chip content={book.genre}/>}
                    <p>{book.publicationYear}</p>
                    <span className="flex gap-2 items-center">
                        <Rating value={book.rating}/>
                        <p>({book.totalRatings})</p>
                    </span>
                </div>
            </div>
        </Link>
    );
}
