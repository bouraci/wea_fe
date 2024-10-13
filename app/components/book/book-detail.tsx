import { BookType } from "@/app/types/BookType";
import { Card } from "@components/card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";

export function BookDetail({ book }: { book: BookType }) {
    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
            <Link
                href="/"
                className="w-max font-bold block p-2 bg-green-500/20 hover:bg-green-900/80 transition-all duration-300 rounded-lg mb-6"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                Back to list
            </Link>

            <Card>
                <div className="grid grid-cols-[max-content_1fr] mt-4 gap-2">
                    <label>Cover Image</label>
                    <Image
                        src={book.coverImageUrl.length === 0 ? PLACEHOLDER_BOOK_COVER_URL : book.coverImageUrl}
                        alt={book.title}
                        height={200}
                        width={150}
                        className="rounded-lg"
                    />

                    <label>Title</label>
                    <input type="text" value={book.title} readOnly className="border p-1 rounded" />

                    <label>Subtitle</label>
                    <input type="text" value={book.subtitle} readOnly className="border p-1 rounded" />

                    <label>Authors</label>
                    <input type="text" value={book.authors.split(";").join(", ")} readOnly className="border p-1 rounded" />

                    <label>ISBN-10</label>
                    <input type="text" value={book.isbN10} readOnly className="border p-1 rounded" />

                    <label>ISBN-13</label>
                    <input type="text" value={book.isbN13} readOnly className="border p-1 rounded" />

                    <label>Published Date</label>
                    <input type="text" value={book.publicationYear.toString()} readOnly className="border p-1 rounded" />

                    <label>Genre</label>
                    <input type="text" value={book.genre} readOnly className="border p-1 rounded" />

                    <label>Rating</label>
                    <input type="text" value={book.rating.toFixed(1)} readOnly className="border p-1 rounded" />

                    <label>Page Count</label>
                    <input type="text" value={book.pageCount} readOnly className="border p-1 rounded" />

                    <label>Description</label>
                    <textarea value={book.description} readOnly className="border bg-zinc-600 p-1 rounded h-32" />
                </div>
            </Card>
        </div>
    );
}
