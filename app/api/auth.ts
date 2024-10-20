import {fetcher} from "@utils/fetcher";
import {UserType} from "@/app/types/UserType";

export type LoginResponse = {
    user: UserType;
    code: number;
}

export type RegisterResponse = {
    code: number;
}

export const login = async (username: string, password: string) => {
    const response = await fetcher(`/api/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'UserName': username,
            'Password': password
        }),
    });

    const data = await response.json();

    const loginResponse: LoginResponse = {
        user: {
            id: data.id,
            name: data.name,
            username: data.userName
        },
        code: response.status
    };

    return loginResponse;
}

export const register = async (username: string, password: string, name: string): Promise<RegisterResponse> => {
    const response = await fetcher(`/api/auth/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'UserName': username,
            'Password': password,
            'Name': name
        }),
    });

    return {
        code: response.status
    };
}