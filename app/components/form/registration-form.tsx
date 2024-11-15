"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { register as userRegister } from "@api/apiAuth";
import toast from "react-hot-toast";
import { useUser } from "@contexts/UserContext";
import { useTranslations } from "next-intl";
import { Button } from "@components/button";
import { FormInput } from "@components/input";

type Inputs = {
  name: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { user } = useUser();
  const router = useRouter();
  const password = watch("password", "");
  const username = watch("username", "");
  const name = watch("name", "");
  const t = useTranslations("login");

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const responseCode = await userRegister(username, password, name);

    if (responseCode == 201) {
      toast.success(t("registerSuccess"));
      router.push("/auth/signin");
    } else if (responseCode == 409) {
      toast.error(t("accountAlreadyExists"));
    } else {
      toast.error(t("registerFailed"));
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        type="text"
        placeholder={t("name")}
        error={errors.name && errors.name.message}
        {...register("name", { required: t("nameRequired") })}
      />
      <FormInput
        type="text"
        placeholder={t("username")}
        error={errors.username && errors.username.message}
        {...register("username", { required: t("usernameRequired") })}
      />
      <FormInput
        type="password"
        placeholder={t("password")}
        error={errors.password && errors.password.message}
        {...register("password", {
          required: t("passwordRequired"),
          minLength: {
            value: 8,
            message: t("passwordMinLength"),
          },
        })}
      />
      <FormInput
        type="password"
        placeholder={t("passwordConfirm")}
        error={
          errors.passwordConfirmation && errors.passwordConfirmation.message
        }
        {...register("passwordConfirmation", {
          required: t("passwordConfirmRequired"),
          validate: (value) => value === password || t("passwordMatch"),
        })}
      />
      <Button label={t("register")} type="submit" />
    </form>
  );
}
