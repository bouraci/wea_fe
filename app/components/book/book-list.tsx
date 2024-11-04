import { Card } from "@components/card";
import { BookListItem } from "@components/book/book-list-item";
import { BookListType } from "@/app/types/BookListType";
import { useTranslations } from "next-intl";

export function BookList({ data }: { data: BookListType }) {
  const t = useTranslations("common");

  if (data.totalRecords === 0) {
    return <p className="text-center text-4xl">{t("noBooks")}</p>;
  }

  return (
    <Card
      heading={t("bookList")}
      subheading={`(${t("total")}: ${data.totalRecords})`}
    >
      <div className="flex flex-col gap-4">
        {data.books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    </Card>
  );
}
