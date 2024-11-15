import { BookCommentRequestType } from "@/app/types/BookType";
import { authFetch } from "@utils/authFetch";

export async function postBookComment(comment: BookCommentRequestType) {
  const response = await authFetch(`/api/comments/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  return response.ok;
}
