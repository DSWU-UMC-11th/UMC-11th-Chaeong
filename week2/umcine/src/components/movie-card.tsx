import React from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleBookmark }) => {
  return (
    <article className="movie-card">
      <div className="poster">
        <img src={movie.posterPath} alt={movie.title} className="poster-image" />
        <button
          className={`bookmark-toggle ${movie.isBookmarked ? "bookmarked" : ""}`}
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={`${movie.title} 즐겨찾기 ${movie.isBookmarked ? "해제" : "추가"}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={movie.isBookmarked ? "#FFFFFF" : "none"}>
            <path
              d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="movie-title">
        <span>{movie.title}</span>
      </div>
      <div className="movie-meta">
        <span>{movie.releaseDate}</span>
      </div>
    </article>
  );
};
