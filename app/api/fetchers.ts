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

export const getBooksList = async () => {
    const response = await fetcher(`/api/books`, {
        method: 'GET',
    });

    return await response.json();
};

export const getBookDetail = async (id: number) => {
    const response = await fetcher(`/api/books/${id}`, {
        method: 'GET',
    });

    return await response.json();
}
