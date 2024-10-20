"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {register as userRegister} from "@api/auth";
import toast from "react-hot-toast";
import {useUser} from "@hooks/useUser";

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
        formState: {errors},
    } = useForm<Inputs>();
    const {user} = useUser();
    const router = useRouter();
    const password = watch("password", "");
    const username = watch("username", "");
    const name = watch("name", "");

    const onSubmit: SubmitHandler<Inputs> = async () => {
        const registerResponse = await userRegister(
            username,
            password,
            name
        );

        if (!registerResponse || !registerResponse.code || registerResponse.code !== 201) {
            toast.error("Registrace se nezdařila!");
        } else {
            toast.success("Registrace proběhla úspěšně!");
            router.push("/auth/signin");
        }
    }

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    return (
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Jméno"
                className="p-2 border border-gray-300 rounded-lg"
                {...register("name", {required: "Je potřeba vaše jméno"})}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            <input
                type="text"
                placeholder="Username"
                className="p-2 border border-gray-300 rounded-lg"
                {...register("username", {required: "Je potřeba uživatelské jméno"})}
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            <input
                type="password"
                placeholder="Heslo"
                className="p-2 border border-gray-300 rounded-lg"
                {...register("password", {
                    required: "Zadejte heslo pro přihlášení",
                    minLength: 8,
                })}
            />
            {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
            )}
            <input
                type="password"
                placeholder="Potvrzení hesla"
                className="p-2 border border-gray-300 rounded-lg"
                {...register("passwordConfirmation", {
                    required: "Je potřeba potvrdit heslo",
                    validate: (value) => value === password || "Hesla se neshodují",
                })}
            />
            {errors.passwordConfirmation && (
                <p className="text-red-500">{errors.passwordConfirmation.message}</p>
            )}
            <button className="p-2 bg-blue-500 text-white rounded-lg" type="submit">
                Registrovat
            </button>
        </form>
    );
}
