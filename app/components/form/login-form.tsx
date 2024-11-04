"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@api/auth";
import { useUser } from "@contexts/UserContext";
import { useTranslations } from "next-intl";

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
  const { user, setUser } = useUser();
  const router = useRouter();
  const username = watch("username", "");
  const password = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      const response = await login(username, password);

      if (response.user === null) {
        toast.error(t("loginFailed"));
      } else {
        toast.success(t("loginSuccess"));
        setUser(response.user);
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
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder={t("username")}
        className="p-2 border border-gray-300 rounded-lg"
        {...register("username", {
          required: t("usernameRequired"),
        })}
      />
      {errors.username && (
        <small className="text-red-500">{errors.username.message}</small>
      )}
      <input
        type="password"
        placeholder={t("password")}
        className="p-2 border border-gray-300 rounded-lg"
        {...register("password", { required: t("passwordRequired") })}
      />
      {errors.password && (
        <small className="text-red-500">{errors.password.message}</small>
      )}
      <button
        className="p-2 bg-blue-500/50 hover:bg-blue-500 border border-blue-500 transition-all duration-300 text-white rounded-lg"
        type="submit"
      >
        {t("login")}
      </button>
    </form>
  );
}
