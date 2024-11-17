import { BookCommentType } from "@/app/types/BookType";
import { Rating } from "@components/rating";
import clsx from "clsx";

export function Comment({
  comment,
  highlight,
}: {
  comment: BookCommentType;
  highlight?: boolean;
}) {
  return (
    <div>
      <div
        className={clsx(
          "p-2 bg-zinc-600 rounded-lg space-y-2",
          highlight && "border-l-4 border-amber-500",
        )}
      >
        <p className="font-bold">{comment.creatorUserName}</p>
        {comment.rating > 0 && <Rating value={comment.rating} size="sm" />}
        <p>{comment.content}</p>
      </div>
      <small>{new Date(comment.createdDate).toLocaleString("cs-CZ")}</small>
    </div>
  );
}
