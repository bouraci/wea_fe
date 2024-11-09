import { RatingInput } from "@components/rating";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@contexts/UserContext";
import { postBookComment } from "@api/commentFetchers";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Button } from "@components/button";

type Inputs = {
  comment: string;
  rating: number;
};

export function CommentForm({ bookId }: { bookId: number }) {
  const { user } = useUser();
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const t = useTranslations("comment");

  if (!user) {
    return <p className="text-center font-bold">{t("loginToComment")}</p>;
  }

  const comment = watch("comment", "");
  const rating = watch("rating", 0);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      const response = await postBookComment({
        content: comment,
        userName: user.username,
        bookId: bookId,
        rating: rating,
      });

      if (response) {
        toast.success(t("commentAddedSuccess"));
        reset();
        await mutate("getBooksDetail");
      } else {
        toast.error(t("commentAddedFailed"));
      }
    } catch {}
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <RatingInput value={field.value} onChange={field.onChange} />
        )}
      />
      <textarea
        className="h-24"
        placeholder="Yap about the book here..."
        {...register("comment", {
          required: t("warnEmptyComment"),
        })}
      />
      {errors.comment && (
        <small className="text-red-500">{errors.comment.message}</small>
      )}

      <Button className="w-max" type="submit" label={t("addComment")} />
    </form>
  );
}
