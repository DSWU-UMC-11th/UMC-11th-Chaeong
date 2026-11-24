import { SearchPage } from "@/screens/movies/search-page";

export default async function Page({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  return <SearchPage key={typeof params.query === "string" ? params.query : ""} initialQuery={typeof params.query === "string" ? params.query : ""} />;
}

