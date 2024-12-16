import { BookType } from "@/app/types/BookType";
import { addBookToFavorites, deleteBookFromFavorites } from "@api/apiBooks";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { Chip } from "@components/chip";
import { LabeledInput } from "@components/input";
import { useUser } from "@contexts/UserContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookmark as faBookmarkSolid,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";
import { CommentList } from "@components/comment";
import { useTranslations } from "next-intl";
import { Rating } from "@components/rating";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { useCart } from "@contexts/CartContext";

export function BookDetail({ book }: { book: BookType }) {
  const t = useTranslations("common");
  const { user } = useUser();
  const { addToCart } = useCart();

  const handleAddToFavorites = async () => {
    const response = await addBookToFavorites(book.id);
    if (response) {
      toast.success(t("bookAddedToFavourites"));
      await mutate("getBooksDetail");
    } else {
      toast.error(t("bookFavoriteFailed"));
    }
  };

  const handleDeleteFromFavorites = async () => {
    const response = await deleteBookFromFavorites(book.id);
    if (response) {
      toast.success(t("bookDeletedFromFavourites"));
      await mutate("getBooksDetail");
    } else {
      toast.error(t("bookFavouriteDeleteFailed"));
    }
  };

  const handleAddToCart = async () => {
    toast.success(t("addedToCartSuccess"));
    addToCart({ book: book, quantity: 1 });
  };

  return (
    <div className="space-y-4">
      <span className="mb-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          {book.isHidden && book.isFavorite && (
            <Chip variant="bad" size="md" content={t("currentlyUnavailable")} />
          )}
        </div>
        <span className="flex gap-2 items-center">
          <Rating value={book.rating} size="lg" />
          {book.rating}
        </span>
      </span>
      <div className="flex gap-2">
        <Link href="/" className="button button--good">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
          {t("backToList")}
        </Link>
        {user && (
          <Button
            icon={
              <FontAwesomeIcon
                icon={book.isFavorite ? faBookmark : faBookmarkSolid}
                size="lg"
              />
            }
            variant={book.isFavorite ? "bad" : "warning"}
            label={
              book.isFavorite ? t("deleteFromFavourites") : t("addToFavourites")
            }
            onClick={
              book.isFavorite ? handleDeleteFromFavorites : handleAddToFavorites
            }
            className="w-max"
          />
        )}
      </div>

      <Card>
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
            className="rounded-lg object-contain"
          />
          <div className="border bg-zinc-600 p-2 rounded-lg w-full">
            {book.description}
          </div>
        </div>

        {book.price && (
          <div className="flex my-6 gap-2 items-center">
            <p className="font-bold text-4xl py-4">{book.price.toFixed(2)},-</p>
            <Button
              icon={<FontAwesomeIcon icon={faCartPlus} size="lg" />}
              label={t("addToCart")}
              className="w-max"
              onClick={handleAddToCart}
              disabled={book.isHidden}
            />
          </div>
        )}

        <div className="space-y-2">
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
        </div>
      </Card>

      {!book.isHidden && (
        <CommentList comments={book.comments} bookId={book.id} />
      )}
    </div>
  );
}
