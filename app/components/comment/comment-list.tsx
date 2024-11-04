import { BookCommentType } from "@/app/types/BookType";
import { Card } from "@components/card";
import { Comment } from "@components/comment/comment";
import { CommentForm } from "@components/form/comment-form";
import { useTranslations } from "next-intl";

export function CommentList({
  comments,
  bookId,
}: {
  comments: BookCommentType[];
  bookId: number;
}) {
  const t = useTranslations("common");

  return (
    <Card heading={`${t("comments")} (${comments.length})`}>
      <div className="flex flex-col gap-2">
        <CommentForm bookId={bookId} />

        <hr className="border-zinc-600" />

        {comments.length === 0 ? (
          <p className="text-center font-bold">{t("noComments")}</p>
        ) : (
          comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))
        )}
      </div>
    </Card>
  );
}
