import { fetcher } from '@utils/fetcher'

export const getAllGenres = async () => {
    const response = await fetcher(`/api/books/genres`, {
        method: 'GET',
    });

    return await response.json();
}
