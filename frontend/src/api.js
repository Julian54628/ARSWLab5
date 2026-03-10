const BASE = "http://localhost:8080/points";

export async function getPoints() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Error fetching points");
  return res.json();
}

export async function postPoint(point) {
  await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(point)
  });
}

export async function clearBoard() {
  await fetch(BASE, { method: "DELETE" });
}
