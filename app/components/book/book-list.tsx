import {Card} from "@components/card";
import {BookType} from "@/app/types/BookType";
import {BookListItem} from "@components/book/book-list-item";

export function BookList({ data }: { data: BookType[] }) {
    if (!data.length) {
        return <p className="text-center text-4xl">No books found.</p>;
    }

    return (
        <Card heading="Book List">
            <div className="flex flex-col gap-4">
                {data.map((book) => (
                    <BookListItem key={book.id} book={book} />
                ))}
            </div>
        </Card>
    );
}
