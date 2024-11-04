import { BookType } from "@/app/types/BookType";
import { Card } from "@components/card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";
import { CommentList } from "@components/comment";
import { useTranslations } from "next-intl";
import { Rating } from "@components/rating";

export function BookDetail({ book }: { book: BookType }) {
  const t = useTranslations("common");
  return (
    <div className="p-2 flex flex-col gap-2">
      <span className="mb-4">
        <h1 className="text-4xl font-bold">{book.title}</h1>
        <span className="flex gap-2 items-center">
          <Rating value={book.rating} />
          {book.rating}
        </span>
      </span>
      <Link
        href="/"
        className="w-max font-bold block p-2 bg-green-800/50 hover:bg-green-800 border border-green-800 transition-all duration-300 rounded-lg mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
        {t("backToList")}
      </Link>

      <Card>
        <div className="grid grid-cols-[max-content_1fr] mt-4 gap-2">
          <label></label>
          <Image
            src={
              book.coverImageUrl.length === 0
                ? PLACEHOLDER_BOOK_COVER_URL
                : book.coverImageUrl
            }
            alt={book.title}
            height={200}
            width={150}
            className="rounded-lg"
          />

          <label>{t("title")}</label>
          <input
            type="text"
            value={book.title}
            readOnly
            className="border p-1 rounded"
          />

          <label>{t("subtitle")}</label>
          <input
            type="text"
            value={book.subtitle}
            readOnly
            className="border p-1 rounded"
          />

          <label>{t("authors")}</label>
          <input
            type="text"
            value={book.authors.split(";").join(", ")}
            readOnly
            className="border p-1 rounded"
          />

          <label>ISBN-10</label>
          <input
            type="text"
            value={book.isbN10}
            readOnly
            className="border p-1 rounded"
          />

          <label>ISBN-13</label>
          <input
            type="text"
            value={book.isbN13}
            readOnly
            className="border p-1 rounded"
          />

          <label>{t("publicationYear")}</label>
          <input
            type="text"
            value={book.publicationYear.toString()}
            readOnly
            className="border p-1 rounded"
          />

          <label>{t("genre")}</label>
          <input
            type="text"
            value={book.genre}
            readOnly
            className="border p-1 rounded"
          />

          <label>{t("pageCount")}</label>
          <input
            type="text"
            value={book.pageCount}
            readOnly
            className="border p-1 rounded"
          />

          <label>{t("description")}</label>
          <textarea
            value={book.description}
            readOnly
            className="border bg-zinc-600 p-1 rounded h-32"
          />
        </div>
      </Card>

      <CommentList comments={book.comments} bookId={book.id} />
    </div>
  );
}
