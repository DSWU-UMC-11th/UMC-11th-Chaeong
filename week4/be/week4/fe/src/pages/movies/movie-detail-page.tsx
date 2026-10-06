import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const navigate = useNavigate();
  const foundMovie = movies.find((item) => item.id === Number(movieId));

  const [isBookmarked, setIsBookmarked] = useState(foundMovie?.isBookmarked ?? false);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");

  if (!foundMovie) {
    return <main className="p-20">영화를 찾을 수 없어요.</main>;
  }

  const movie = foundMovie;

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen bg-[#F6F7F9] pb-[60px]">
      <div
        className="relative w-full h-[360px] bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${movie.backdropPath})` }}
      >
        <div className="flex flex-col justify-between items-start px-20 py-6 h-full box-border">
          <button
            className="flex flex-row items-center gap-1 bg-none border-none cursor-pointer font-semibold text-[13px] text-white"
            onClick={() => navigate({ to: "/" })}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>영화 목록</span>
          </button>

          <div className="flex flex-col gap-2 w-[800px]">
            <h1 className="font-semibold text-[46px] leading-[50px] tracking-[-2.3px] text-white m-0">
              {movie.title}
            </h1>
            <div className="font-medium text-sm text-white">{movie.originalTitle}</div>
            <div className="flex flex-row items-center gap-2 font-semibold text-[13px] text-white">
              <span>{movie.releaseDate}</span>
              <span>•</span>
              <span>{movie.genres.join(" · ")}</span>
              <span>•</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-row items-start px-20 py-6 gap-8 w-full max-w-[1440px] box-border">
        <div className="w-[200px] h-[286px] rounded-[10px] overflow-hidden shadow-[0px_12px_30px_rgba(12,15,20,0.12)] bg-[#F6F7F9] flex-shrink-0">
          <img src={movie.posterPath} alt={movie.title} className="w-full h-full object-cover" />
        </div>

        <section className="flex flex-col gap-3 flex-1 whitespace-nowrap">
          <h2 className="font-semibold text-[21px] leading-[25px] tracking-[-0.63px] text-[#17191E]">
            {movie.tagline}
          </h2>
          <p className="font-medium text-sm leading-6 text-[#606774]">{movie.overview}</p>
          <div className="flex mt-4">
            <button
              className={cn(
                "box-border flex flex-row justify-center items-center px-4 gap-2 h-[42px] border border-white rounded-lg text-white font-black text-sm cursor-pointer",
                isBookmarked ? "bg-[#2563EB]" : "bg-[#2563EB]",
              )}
              onClick={() => setIsBookmarked((prev) => !prev)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isBookmarked ? "#FFFFFF" : "none"}>
                <path
                  d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                  stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <span>{isBookmarked ? "즐겨찾기됨" : "즐겨찾기"}</span>
            </button>
          </div>
        </section>

        <aside className="flex flex-col gap-2 w-[360px] pl-[30px] box-border">
          <h2 className="font-semibold text-[21px] text-[#17191E]">내 평점</h2>
          <p className="text-xs text-[#969DA8]">별점은 필수, 후기는 선택이에요.</p>

          <div className="flex flex-row gap-1 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="box-border flex justify-center items-center w-[38px] h-[38px] bg-white border border-[#E3E6EB] rounded-lg cursor-pointer"
                onClick={() => setRating(star)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={star <= rating ? "#FFB800" : "none"}>
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    stroke={star <= rating ? "#FFB800" : "#606774"}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>

          <textarea
            className="box-border w-[329px] h-[102px] p-3 bg-white border border-[#E3E6EB] rounded-lg text-[13px] text-[#17191E] outline-none resize-none"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button
            type="button"
            className="box-border w-[329px] h-[42px] bg-[#17191E] border border-white rounded-lg font-black text-sm text-white cursor-pointer"
          >
            평점 저장
          </button>
        </aside>
      </main>
    </div>
  );
}