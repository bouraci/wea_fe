import { BookCommentRequestType } from "@/app/types/BookType";

export async function postBookComment(comment: BookCommentRequestType) {
  const response = await fetch(`/api/comments/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  return await response.text();
}
