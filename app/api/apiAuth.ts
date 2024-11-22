import { tokenManager } from "@utils/tokenManager";

export const login = async (username: string, password: string) => {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: username,
      password: password,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const token = await response.text();
  tokenManager.setToken(token);

  return token;
};

export const register = async (
  username: string,
  password: string,
  name: string,
) => {
  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: username,
      password: password,
      name: name,
      // this needs to go away
      favouriteGerners: [],
    }),
  });

  return response.status;
};
