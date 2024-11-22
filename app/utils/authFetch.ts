import { tokenManager } from "@utils/tokenManager";

export const authFetch = async (url: string, options: RequestInit = {}) => {
  if (!tokenManager.isTokenValid()) {
    tokenManager.invalidateToken();
    return Promise.reject("Token is invalid or expired");
  }

  const token = tokenManager.getToken();
  console.log(token);
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  return fetch(url, { ...options, headers: authHeaders });
};
