"use client";

import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserType } from "@/app/types/UserType";

type UserContextType = {
  user: UserType | undefined;
  token: string | null;
  setUserFromToken: (token: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserType | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUserFromToken(storedToken);
    }
  }, []);

  const setUserFromToken = (token: string | null) => {
    if (token) {
      const decodedToken = jwtDecode<{ exp: number } & UserType>(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        logout();
      } else {
        setUserState(decodedToken);
        setToken(token);
        localStorage.setItem("token", token);
      }
    } else {
      setUserState(undefined);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setUserFromToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, setUserFromToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
