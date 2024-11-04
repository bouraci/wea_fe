"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { register as userRegister } from "@api/auth";
import toast from "react-hot-toast";
import { useUser } from "@contexts/UserContext";
import { useTranslations } from "next-intl";

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
    const registerResponse = await userRegister(username, password, name);

    if (registerResponse.code == 201) {
      toast.success(t("registerSuccess"));
      router.push("/auth/signin");
    } else if (registerResponse.code == 409) {
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
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder={t("name")}
        className="p-2 border border-gray-300 rounded-lg"
        {...register("name", { required: t("nameRequired") })}
      />
      {errors.name && (
        <small className="text-red-500">{errors.name.message}</small>
      )}
      <input
        type="text"
        placeholder={t("username")}
        className="p-2 border border-gray-300 rounded-lg"
        {...register("username", { required: t("usernameRequired") })}
      />
      {errors.username && (
        <small className="text-red-500">{errors.username.message}</small>
      )}
      <input
        type="password"
        placeholder={t("password")}
        className="p-2 border border-gray-300 rounded-lg"
        {...register("password", {
          required: t("passwordRequired"),
          minLength: {
            value: 8,
            message: t("passwordMinLength"),
          },
        })}
      />
      {errors.password && (
        <small className="text-red-500">{errors.password.message}</small>
      )}
      <input
        type="password"
        placeholder={t("passwordConfirm")}
        className="p-2 border border-gray-300 rounded-lg"
        {...register("passwordConfirmation", {
          required: t("passwordConfirmRequired"),
          validate: (value) => value === password || t("passwordMatch"),
        })}
      />
      {errors.passwordConfirmation && (
        <small className="text-red-500">
          {errors.passwordConfirmation.message}
        </small>
      )}
      <button
        className="p-2 bg-blue-500/50 hover:bg-blue-500 border border-blue-500 transition-all duration-300 text-white rounded-lg"
        type="submit"
      >
        {t("register")}
      </button>
    </form>
  );
}
