"use client";

import { postBookComment } from "@api/apiComments";
import { Button } from "@components/button";
import { RatingInput } from "@components/rating";
import { useUser } from "@contexts/UserContext";
import { useTranslations } from "next-intl";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { mutate } from "swr";

type Inputs = {
  comment: string;
  rating: number;
};

export function CommentForm({
  bookId,
  userHasRated,
}: {
  bookId: number;
  userHasRated: boolean;
}) {
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
    return (
      <p className="text-center font-bold text-lg py-2">
        {t("loginToComment")}
      </p>
    );
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
      {!userHasRated ? (
        <div className="flex gap-4 items-center">
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <RatingInput value={field.value} onChange={field.onChange} />
            )}
          />
          {rating > 0 ? <b>{rating} / 5</b> : <p>{t("noRatingProvided")}</p>}
        </div>
      ) : (
        <p className="text-center font-bold text-lg py-2">
          {t("youAlreadyRated")}
        </p>
      )}

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
