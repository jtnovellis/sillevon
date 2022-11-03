export async function loadGenres() {
  const res = await fetch(`${process.env.BACKEND_URI}/api/genres`);
  const genres = await res.json();
  return genres;
}
