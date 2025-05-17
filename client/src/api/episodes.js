export async function fetchEpisodes() {
  const res = await fetch('/api/episodes');
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).episodes;
}
