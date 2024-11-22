import { UserDetailDataType } from "@/app/types/UserType";
import { authFetch } from "@utils/authFetch";

export async function getUserDetails() {
  const response = await authFetch("/api/user/detail", {
    method: "GET",
  });

  return response.json();
}

export async function updateUserDetails(data: UserDetailDataType) {
  const response = await authFetch("/api/user/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.ok;
}
