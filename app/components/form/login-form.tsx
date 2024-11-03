"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {login} from "@api/auth";
import {useUser} from "@contexts/UserContext";

type Inputs = {
  username: string;
  password: string;
};

export function LoginForm() {
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
      const loginResponse = await login(
        username,
        password,
      );

      if (!loginResponse || !loginResponse.code || loginResponse.code !== 200) {
        toast.error("Neplatné údaje!");
      } else {
        toast.success("Přihlášení proběhlo úspěšně!");
        setUser(loginResponse.user);
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
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
        placeholder="Username"
        className="p-2 border border-gray-300 rounded-lg"
        {...register("username", {
          required: "Je potřeba zadat uživatelské jméno"
        })}
      />
      {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      <input
        type="password"
        placeholder="Heslo"
        className="p-2 border border-gray-300 rounded-lg"
        {...register("password", { required: "Je potřeba zadat heslo" })}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <button className="p-2 bg-blue-500 text-white rounded-lg" type="submit">
        Přihlásit se
      </button>
    </form>
  );
}
