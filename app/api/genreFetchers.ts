export async function getAllGenres() {
  const response = await fetch(`/api/books/genres`, {
    method: "GET",
  });

  return await response.json();
}
