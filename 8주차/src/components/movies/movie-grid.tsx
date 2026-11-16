import React from "react";
import type { TmdbMovieListItem } from "../../api/movies/model";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
  onToggleBookmark: (id: number) => void;
  onSelectMovie?: (movie: TmdbMovieListItem) => void;
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
