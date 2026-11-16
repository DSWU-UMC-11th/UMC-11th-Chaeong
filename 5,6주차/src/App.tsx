import { useState } from "react";
import { MovieGrid } from "./components/movies/movie-grid";
import { Pagination } from "./components/movies/pagination";
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import "./App.css";

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
  };

  return (
    <div className="app-container">
      <main className="main-container">
        <h1 className="page-title">영화 목록</h1>
        <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
        <Pagination currentPage={1} totalPages={5} />
      </main>
       <p className="text-xs text-[#969DA8] mt-2">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
    </div>
  );
}