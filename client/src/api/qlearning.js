// src/api/qlearning.js
export async function getQlearningResult() {
  const res = await fetch('http://localhost:3000/api/python-test');
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
}
