import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  if (!path.length || !["movie", "search"].includes(path[0])) {
    return Response.json({ message: "지원하지 않는 TMDB 경로예요." }, { status: 404 });
  }

  const baseUrl = process.env.VITE_TMDB_API_BASE_URL;
  const token = process.env.VITE_TMDB_ACCESS_TOKEN;
  if (!baseUrl || !token) {
    return Response.json({ message: "TMDB 환경 변수가 설정되지 않았어요." }, { status: 500 });
  }

  const upstream = new URL(`${baseUrl.replace(/\/$/, "")}/${path.map(encodeURIComponent).join("/")}`);
  request.nextUrl.searchParams.forEach((value, key) => upstream.searchParams.set(key, value));
  const response = await fetch(upstream, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return new Response(response.body, {
    status: response.status,
    headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
  });
}

