import {BookType} from "@/app/types/BookType";
import {Card} from "@components/card";
import Link from "next/link";

export function BookDetail({ book }: { book: BookType }) {
    return (
        <Card heading={book.title} subheading={book.authors}>
            <>
                <Link href="/" className="p-2 bg-green-500/20 hover:bg-green-900/80 transition-all duration-300 rounded-lg mb-4" >
                    Back to list
                </Link>
                <div className="grid grid-cols-[max-content_1fr] mt-4 gap-2">
                    <label>Title</label>
                    <input type="text" value={book.title} readOnly/>
                    <label>Author</label>
                    <input type="text" value={book.authors} readOnly/>
                    <label>ISBN</label>
                    <input type="text" value={book.isbn} readOnly/>
                    <label>Published Date</label>
                    <input type="text" value={book.publishedDate} readOnly/>
                </div>
            </>
        </Card>
    );
}