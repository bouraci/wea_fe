import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_BOOK_COVER_URL } from "@/app/constants";
import { Rating } from "@components/rating";
import { Chip } from "@components/chip";
import { AmountInput } from "@components/input";
import { useCart } from "@contexts/CartContext";
import { CartItemType } from "@/app/types/CartType";
import { useTranslations } from "next-intl";

export function BookOrderListItem({
  item,
  noButtons,
}: {
  item: CartItemType;
  noButtons?: boolean;
}) {
  const { updateQuantity, removeFromCart } = useCart();
  const t = useTranslations("cart");

  function handleCartDecrease() {
    if (item.quantity === 1) {
      removeFromCart(item.book.id);
    } else {
      updateQuantity(item.book.id, item.quantity - 1);
    }
  }

  return (
    <div className="items-center flex gap-3 justify-between p-4 border border-zinc-400 rounded-lg card-list-item">
      <div className="flex gap-4">
        <Image
          src={
            item.book.coverImageUrl.length === 0
              ? PLACEHOLDER_BOOK_COVER_URL
              : item.book.coverImageUrl
          }
          className="rounded-lg object-contain"
          alt={item.book.title}
          height={100}
          width={100}
        />
        <div className="flex flex-col gap-1">
          <Link href={`/books/${item.book.id}`} className="font-bold text-2xl">
            {item.book.title}
          </Link>
          <p className="italic">{item.book.authors.split(";").join(", ")}</p>
          {item.book.genre.length > 0 && <Chip content={item.book.genre} />}
          <p>{item.book.publicationYear}</p>
          <span className="flex gap-2 items-center">
            <Rating value={item.book.rating} />
            <p>({item.book.totalRatings})</p>
          </span>
        </div>
      </div>

      <div className="space-y-2 mt-auto">
        {item.book.price && (
          <p className="text-xl font-bold text-right pt-2">
            {(item.book.price * item.quantity).toFixed(2)},-
          </p>
        )}
        {!noButtons ? (
          <AmountInput
            amount={item.quantity}
            onIncrease={() => updateQuantity(item.book.id, item.quantity + 1)}
            onDecrease={() => handleCartDecrease()}
          />
        ) : (
          <p className="font-bold text-right text-xl">
            {t("qty")}: {item.quantity}x
          </p>
        )}
      </div>
    </div>
  );
}
