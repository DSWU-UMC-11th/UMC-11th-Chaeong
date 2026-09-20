import React from "react";
import type { Movie } from "../types/movie";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (id: number) => void;
  onSelectMovie?: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onToggleBookmark,
  onSelectMovie,
}) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => onSelectMovie && onSelectMovie(movie)}>
          <MovieCard movie={movie} onToggleBookmark={onToggleBookmark} />
        </div>
      ))}
    </div>
  );
};
