import { fetcher } from '@utils/fetcher'

export const getGreetingMessage = async (name: string) => {
    const response = await fetcher(`/api/greeting`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
    });

    return await response.text();
};
