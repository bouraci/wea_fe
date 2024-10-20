
import {UserType} from "@/app/types/UserType";
import {useRouter} from "next/navigation";
import Link from "next/link";

export function UserChip({user}: {user?: UserType}) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
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
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.username}</p>
            </div>

            <button className="p-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>Logout</button>
        </div>
    )
}