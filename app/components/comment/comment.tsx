import {BookCommentType} from "@/app/types/BookType";

export function Comment({ comment }: { comment: BookCommentType }) {
    return (
        <div>
            <div className="p-2 bg-zinc-600 rounded-lg">
                <p className="font-bold">{comment.creatorUserName}</p>
                <p>{comment.content}</p>
            </div>
            <small>{new Date(comment.createdDate).toLocaleString("cs-CZ")}</small>
        </div>
    );
}