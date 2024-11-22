import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Button } from "@components/button";
import { useCart } from "@contexts/CartContext";

export function UserChip() {
  const router = useRouter();
  const { user, setUserFromToken } = useUser();
  const { clearCart } = useCart();
  const t = useTranslations("login");

  const handleLogout = () => {
    setUserFromToken(null);
    clearCart();
    toast.success(t("logoutSuccess"));
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4 w-full justify-between">
        <p className="font-semibold">{t("notLoggedIn")}</p>
        <Link className="button button--gray" href="/auth/signin">
          {t("login")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 w-full justify-between">
      <div className="flex gap-2">
        <Link
          href="/user"
          className="hover:border-2 hover:border-gray-200 hover:bg-gray-800 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center"
        >
          {user.name.substring(0, 2).toUpperCase()}
        </Link>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-500">{user.username}</p>
        </div>
      </div>

      <Button
        className="aspect-square w-max p-3 rounded-full"
        icon={<FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />}
        onClick={handleLogout}
        variant="bad"
      />
    </div>
  );
}
