import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { UserSidebarLink } from "@components/user/user-sidebar-link";

export function UserSidebarWrapper() {
  return (
    <div className="flex flex-col gap-4">
      <UserSidebarLink href="/user" icon={faUser}>
        User
      </UserSidebarLink>
      <UserSidebarLink href="/user/orders" icon={faCartShopping}>
        Orders
      </UserSidebarLink>
    </div>
  );
}
