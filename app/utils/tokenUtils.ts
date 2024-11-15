import { jwtDecode } from "jwt-decode";

type TokenValidResult = {
  isValid: boolean;
  token: string | null;
};

export function checkTokenIsValid(): TokenValidResult {
  const token = localStorage.getItem("token");
  if (token === null) {
    return { isValid: false, token: token };
  }

  const decodedToken = jwtDecode<{ exp: number }>(token);

  return { isValid: decodedToken.exp * 1000 > Date.now(), token: token };
}
