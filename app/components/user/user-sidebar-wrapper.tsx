import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { UserSidebarLink } from "@components/user/user-sidebar-link";
import { useTranslations } from "next-intl";

export function UserSidebarWrapper() {
  const t = useTranslations("user");
  return (
    <div className="flex flex-col gap-4">
      <UserSidebarLink href="/user" icon={faUser}>
        {t("userDetails")}
      </UserSidebarLink>
      <UserSidebarLink href="/user/orders" icon={faCartShopping}>
        {t("userOrders")}
      </UserSidebarLink>
    </div>
  );
}
