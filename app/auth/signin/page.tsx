import {LoginForm} from "@components/form";
import Link from "next/link";

export default function SignInPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="w-32 text-white md:w-36">
                    <h1 className="text-2xl font-bold">Přihlášení</h1>
                </div>

                <LoginForm/>

                <div className="text-center">
                    <p className="text-center mt-4 text-gray-500">Nemáte účet?</p>
                    <Link className="text-blue-500" href="/auth/signup">
                        Zaregistrujte se
                    </Link>
                    <br/>
                    <Link className="text-blue-500" href="/">
                        Zpet na domovskou obrazovku
                    </Link>
                </div>
            </div>
        </main>
    );
}
