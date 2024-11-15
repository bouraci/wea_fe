import { checkTokenIsValid } from "@utils/tokenUtils";

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const tokenValidity = checkTokenIsValid();
  if (!tokenValidity.isValid) {
    window.location.reload();
  }

  const authHeaders = {
    Authorization: `Bearer ${tokenValidity.token}`,
    ...options.headers,
  };

  return fetch(url, { ...options, headers: authHeaders });
};
