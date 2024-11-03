export async function loadData() {
    const response = await fetch(`/api/data/csv`, {
        method: 'POST',
    });

    if (response.ok) {
        return await response.text();
    }

    return null;
}
