"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserType } from "@/app/types/UserType";

type UserContextType = {
    user: UserType | undefined;
    setUser: (user: UserType | undefined) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<UserType | undefined>(undefined);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserState(JSON.parse(storedUser));
        }
    }, []);

    const setUser = (newUser: UserType | undefined) => {
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
        } else {
            localStorage.removeItem("user");
        }
        setUserState(newUser);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("userContext must be used within a UserProvider");
    }
    return context;
}
