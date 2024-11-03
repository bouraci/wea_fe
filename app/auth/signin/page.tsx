import {LoginForm} from "@components/form";
import Link from "next/link";
import {useTranslations} from "next-intl";

export default function SignInPage() {
    const t = useTranslations("login");

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="w-32 text-white md:w-36">
                    <h1 className="text-2xl font-bold">{t('login')}</h1>
                </div>

                <LoginForm/>

                <div className="text-center">
                    <p className="text-center mt-4 text-gray-500">{t('noAccount')}</p>
                    <Link className="text-blue-500" href="/auth/signup">
                        {t('registerAlt')}
                    </Link>
                    <br/>
                    <Link className="text-blue-500" href="/">
                        {t('backToHomepage')}
                    </Link>
                </div>
            </div>
        </main>
    );
}
