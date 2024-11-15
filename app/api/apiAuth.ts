export const login = async (username: string, password: string) => {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserName: username,
      Password: password,
    }),
  });

  if (!response.ok) {
    return null;
  }

  return await response.text();
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
      UserName: username,
      Password: password,
      Name: name,
    }),
  });

  return response.status;
};
