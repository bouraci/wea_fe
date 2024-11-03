import {SubmitHandler, useForm} from "react-hook-form";
import {useUser} from "@contexts/UserContext";
import {postBookComment} from "@api/commentFetchers";
import {mutate} from "swr";
import toast from "react-hot-toast";

type Inputs = {
    comment: string;
};

export function CommentForm({bookId}: {bookId: number}) {
    const { user } = useUser();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    if (!user) {
        return (
            <p className="text-center font-bold">You need to be logged in to comment</p>
        );
    }

    const comment = watch("comment", "");

    const onSubmit: SubmitHandler<Inputs> = async () => {
        try {
            await postBookComment(
                {
                    content: comment,
                    userName: user.username,
                    bookId: bookId,
                }
            );

            toast.success("Komentář byl úspěšně přidán");
            reset();
            await mutate("getBooksDetail");
        } catch {
            toast.error("Komentář se nepodařilo přidat");
        }
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <textarea
                className="border p-1 rounded h-24"
                placeholder="Yap here"
                {...register("comment", {
                    required: "Comment body cannot be empty",
                })}
            />
            {errors.comment && (
                <small className="text-red-500">{errors.comment.message}</small>
            )}

            <button
                className="px-2 w-max py-1 text-sm bg-blue-500/50 hover:bg-blue-500 border border-blue-500 transition-all duration-300 rounded-lg"
                type="submit"
            >
                Add Comment
            </button>
        </form>
    );
}