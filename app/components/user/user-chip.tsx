import {useRouter} from "next/navigation";
import Link from "next/link";
import {useUser} from "@contexts/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useTranslations} from "next-intl";
import toast from "react-hot-toast";

export function UserChip() {
    const router = useRouter();
    const { user, setUser } = useUser();
    const t = useTranslations('login');

    const handleLogout = () => {
        setUser(undefined);
        toast.success(t('logoutSuccess'));
        router.push("/");
    };

    if (!user) {
        return (
            <div className="flex items-center space-x-4  w-full justify-between">
                <p className="font-semibold">{t('notLoggedIn')}</p>
                <Link className="p-2 px-4 rounded-lg bg-zinc-500/50 hover:bg-zinc-500 border border-zinc-500 transition-all duration-300" href="/auth/signin">{t('login')}</Link>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-4 w-full justify-between">
            <div className="flex gap-2">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    {user.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-500">{user.username}</p>
                </div>
            </div>

            <button
                className="p-2 aspect-square flex items-center transition-all duration-300 justify-center bg-red-500/50 hover:bg-red-500 border border-red-500 text-white rounded-full"
                onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg"/>
            </button>
        </div>
    )
}