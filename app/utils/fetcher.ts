export const fetcher = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    return response;
};
