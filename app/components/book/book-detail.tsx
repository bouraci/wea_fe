import { BookType } from "@/app/types/BookType";
import { Card } from "@components/card";
import { LabeledInput } from "@components/input";
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
          <Rating value={book.rating} size="lg" />
          {book.rating}
        </span>
      </span>
      <Link href="/" className="button button--good mb-6 w-max">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
        {t("backToList")}
      </Link>

      <Card className="space-y-2">
        <div className="flex gap-2">
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
          <div className="border bg-zinc-600 p-2 rounded-lg w-full">
            {book.description}
          </div>
        </div>

        <LabeledInput label={t("subtitle")} value={book.subtitle} readOnly />
        <LabeledInput
          label={t("authors")}
          value={book.authors.split(";").join(", ")}
          readOnly
        />
        <LabeledInput label="ISBN-10" value={book.isbN10} readOnly />
        <LabeledInput label="ISBN-13" value={book.isbN13} readOnly />
        <LabeledInput
          label={t("publicationYear")}
          value={book.publicationYear.toString()}
          readOnly
        />
        <LabeledInput label={t("genre")} value={book.genre} readOnly />
        <LabeledInput
          label={t("pageCount")}
          value={book.pageCount.toString()}
          readOnly
        />
      </Card>

      <CommentList comments={book.comments} bookId={book.id} />
    </div>
  );
}
