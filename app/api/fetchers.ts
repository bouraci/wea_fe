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

export async function getBooksList(
    page: number = 1,
    pageSize: number = 10,
    filters: {
        title?: string;
        author?: string;
        genre?: string;
        publicationYear?: string;
        minRating?: string;
        maxRating?: string;
    } = {}
) {
    const queryParams = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        ...filters,
    });

    const response = await fetcher(`/api/books?${queryParams.toString()}`, {
        method: 'GET',
    });

    return response.json();
}


export const getBookDetail = async (id: number) => {
    const response = await fetcher(`/api/books/${id}`, {
        method: 'GET',
    });

    return await response.json();
}
