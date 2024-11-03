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

    const response = await fetch(`/api/books?${queryParams.toString()}`, {
        method: 'GET',
    });

    return response.json();
}

export async function getBookDetail(id: number) {
    const response = await fetch(`/api/books/${id}`, {
        method: 'GET',
    });

    return await response.json();
}
