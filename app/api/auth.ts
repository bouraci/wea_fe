export type RegisterResponse = {
  code: number;
};

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
    return {
      user: null,
      code: response.status,
    };
  }

  const data = await response.json();

  return {
    user: {
      id: data.id,
      name: data.name,
      username: data.userName,
    },
    code: response.status,
  };
};

export const register = async (
  username: string,
  password: string,
  name: string,
): Promise<RegisterResponse> => {
  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserName: username,
      Password: password,
      Name: name,
    }),
  });

  return {
    code: response.status,
  };
};
