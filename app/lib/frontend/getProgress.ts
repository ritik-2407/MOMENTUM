export async function getProgress(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/progress/${id}`, {
    cache: "no-store",
  });

  return res.json();
}
