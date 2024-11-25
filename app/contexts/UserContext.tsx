"use client";

import { UserType } from "@/app/types/UserType";
import { tokenManager } from "@utils/tokenManager";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  user: UserType | undefined;
  setUserFromToken: (token: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUser = () => {
      const storedToken = tokenManager.getToken();

      if (storedToken) {
        tokenManager.setToken(storedToken);
        const isValid = tokenManager.isTokenValid();

        if (isValid) {
          const decodedUser = jwtDecode<UserType>(storedToken);
          setUser(decodedUser);
        } else {
          tokenManager.invalidateToken();
        }
      }

      setIsLoading(false);
    };

    initializeUser();

    tokenManager.onTokenInvalid(() => {
      setUser(undefined);
      window.location.href = "/auth/signin";
    });
  }, []);

  const setUserFromToken = (token: string | null) => {
    tokenManager.setToken(token);

    if (token && tokenManager.isTokenValid()) {
      const decodedUser = jwtDecode<UserType>(token);
      setUser(decodedUser);
    } else {
      setUser(undefined);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUserFromToken }}>
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
