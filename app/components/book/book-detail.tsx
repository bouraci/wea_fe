import {BookType} from "@/app/types/BookType";
import {Card} from "@components/card";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export function BookDetail({ book }: { book: BookType }) {
    return (
        <div>
            <h1>{book.title}</h1>
            <Link href="/" className="w-max font-bold block p-2 bg-green-500/20 hover:bg-green-900/80 transition-all duration-300 rounded-lg mb-6" >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                back to list
            </Link>

            <Card>
                <div className="grid grid-cols-[max-content_1fr] mt-4 gap-2">
                    <label>Title</label>
                    <input type="text" value={book.title} readOnly/>
                    <label>Author</label>
                    <input type="text" value={book.authors.split(";").join(", ")} readOnly/>
                    <label>ISBN</label>
                    <input type="text" value={book.isbn} readOnly/>
                    <label>Published Date</label>
                    <input type="text" value={book.publishedDate} readOnly/>
                </div>
            </Card>
        </div>
    );
}