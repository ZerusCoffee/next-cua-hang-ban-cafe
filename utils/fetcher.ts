export async function fetcher(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("API endpoint is not defined");
  }

  const fullUrl = path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
  const res = await fetch(fullUrl, {
    next: { revalidate: 60 }
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("API ERROR", {
      fullUrl,
      status: res.status,
      data
    });

    throw new Error(data?.message || "API Error");
  }

  return data;
}