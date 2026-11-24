import type { TmdbMovieListResponse } from "./model";

export type GetMoviesWithFetchResponse = TmdbMovieListResponse;

export async function getMoviesWithFetch(page = 1): Promise<GetMoviesWithFetchResponse> {
  const response = await fetch(`/api/tmdb/movie/popular?language=ko-KR&page=${page}`);
  if (!response.ok) throw new Error(`영화 목록 요청에 실패했어요: ${response.status}`);
  return response.json();
}
