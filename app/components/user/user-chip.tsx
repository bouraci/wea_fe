import {useRouter} from "next/navigation";
import Link from "next/link";
import {useUser} from "@contexts/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

export function UserChip() {
    const router = useRouter();
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(undefined);
        router.push("/");
    };

    if (!user) {
        return (
            <div className="flex items-center space-x-4  w-full justify-between">
                <p className="font-semibold">Not logged in</p>
                <Link className="p-2 px-4 bg-zinc-500 rounded-lg hover:bg-zinc-600 transition-all" href="/auth/signin">Login</Link>
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