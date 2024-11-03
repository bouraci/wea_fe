import {fetcher} from "@utils/fetcher";
import {BookCommentRequestType} from "@/app/types/BookType";

export const postBookCommnent = async (comment: BookCommentRequestType) => {
    const response = await fetcher(`/api/comments/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });

    return await response.text();
};