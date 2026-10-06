import React from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleBookmark }) => {
  return (
    <article className="flex flex-col items-start w-full h-auto gap-1 cursor-pointer">
      <div className="relative flex flex-col justify-center items-start w-full aspect-[2/3] bg-[#F6F7F9] rounded-[10px] overflow-hidden">
        <img src={movie.posterPath} alt={movie.title} className="w-full h-full object-cover" />
        <button
          className={cn(
            "absolute right-[10px] top-[10px] flex items-center justify-center w-[34px] h-[34px] py-[7.5px] px-[6px] bg-[#17191E] border border-white rounded-lg cursor-pointer z-10 transition-colors",
            movie.isBookmarked && "bg-[#2563EB] border-[#2563EB]",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(movie.id);
          }}
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

      <div className="flex flex-col items-start w-full h-[22px] pt-[5px]">
        <span className="font-extrabold text-sm leading-[17px] text-[#17191E] truncate w-full">
          <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
            {movie.title}
          </Link>
        </span>
      </div>

      <div className="flex flex-col items-start w-full h-[14px]">
        <span className="text-xs leading-[14px] text-[#969DA8]">{movie.releaseDate}</span>
      </div>
    </article>
  );
};