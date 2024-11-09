import { BookCommentType } from "@/app/types/BookType";
import { Rating } from "@components/rating";

export function Comment({ comment }: { comment: BookCommentType }) {
  return (
    <div>
      <div className="p-2 bg-zinc-600 rounded-lg space-y-2">
        <p className="font-bold">{comment.creatorUserName}</p>
        <Rating value={comment.rating} size="sm" />
        <p>{comment.content}</p>
      </div>
      <small>{new Date(comment.createdDate).toLocaleString("cs-CZ")}</small>
    </div>
  );
}
