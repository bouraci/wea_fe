"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@api/apiAuth";
import { useUser } from "@contexts/UserContext";
import { useTranslations } from "next-intl";
import { FormInput } from "@components/input";
import { Button } from "@components/button";

type Inputs = {
  username: string;
  password: string;
};

export function LoginForm() {
  const t = useTranslations("login");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { user, setUserFromToken } = useUser();
  const router = useRouter();
  const username = watch("username", "");
  const password = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      const response = await login(username, password);

      if (!response) {
        toast.error(t("loginFailed"));
      } else {
        toast.success(t("loginSuccess"));
        setUserFromToken(response);
        router.push("/");
      }
    } catch {}
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        type="text"
        placeholder={t("username")}
        error={errors.username && errors.username.message}
        {...register("username", {
          required: t("usernameRequired"),
        })}
      />
      <FormInput
        type="password"
        placeholder={t("password")}
        error={errors.password && errors.password.message}
        {...register("password", {
          required: t("passwordRequired"),
        })}
      />
      <Button type="submit" label={t("login")} className="w-full" />
    </form>
  );
}
