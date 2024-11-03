import {RegistrationForm} from "@components/form";
import {useTranslations} from "next-intl";

export default function SignUpPage() {
    const t = useTranslations("login");

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="w-32 text-white md:w-36">
                    <h1 className="text-2xl font-bold">{t('register')}</h1>
                </div>

                <RegistrationForm/>
            </div>
        </main>
    );
}
