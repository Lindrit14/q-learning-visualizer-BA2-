export async function getMaze(size = 10) {
  const res = await fetch(`http://localhost:4000/api/maze?size=${size}`);
  if (!res.ok) throw new Error('Failed to fetch maze');
  return await res.json();
}
