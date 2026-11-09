import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";

export function MovieListPage() {
  const [page, setPage] = useState(1);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
    placeholderData : keepPreviousData,
  });

  const movies = (moviesQuery.data?.results ?? []).map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedIds.has(movie.id),
  }));
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 0, 500);
  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="main-container">
      <h1 className="page-title">영화 목록</h1>
      {moviesQuery.isPending ? (
        <p className="no-movies">로딩 중...</p>
      ) : moviesQuery.isError ? (
        <p className="no-movies">{moviesQuery.error.message}</p>
      ) : movies.length === 0 ? (
        <p className="no-movies">영화를 찾을 수 없어요.</p>
      ) : (
        <>
          <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}