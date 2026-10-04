import { useState } from "react";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";
import type { Movie } from "../../types/movie";

export function MovieListPage() {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
  };

  return (
    <main className="main-container">
      <h1 className="page-title">영화 목록</h1>
      {movieList.length === 0 ? (
        <p className="no-movies">영화를 찾을 수 없어요.</p>
      ) : (
        <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
      )}
      <Pagination currentPage={1} totalPages={5} />
    </main>
  );
}