import {Card} from "@components/card";
import {BookListItem} from "@components/book/book-list-item";
import {BookListType} from "@/app/types/BookListType";

export function BookList({ data }: { data: BookListType }) {
    if (data.totalRecords === 0) {
        return <p className="text-center text-4xl">No books found.</p>;
    }

    return (
        <Card heading="Book List" subheading={`(celkem: ${data.totalRecords})`}>
            <div className="flex flex-col gap-4">
                {data.books.map((book) => (
                    <BookListItem key={book.id} book={book} />
                ))}
            </div>
        </Card>
    );
}
