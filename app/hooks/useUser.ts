import { useState, useEffect } from "react";
import {UserType} from "@/app/types/UserType";

export function useUser() {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return { user, setUser };
}
