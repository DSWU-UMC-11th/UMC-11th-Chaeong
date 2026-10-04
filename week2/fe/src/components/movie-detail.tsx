import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { movies } from "../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const navigate = useNavigate();
  const foundMovie = movies.find((item) => item.id === Number(movieId));

  const [isBookmarked, setIsBookmarked] = useState(foundMovie?.isBookmarked ?? false);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");

  if (!foundMovie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  const movie = { ...foundMovie, isBookmarked };

  return (
    <div className="detail-page-container">
      <div
        className="detail-stage"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${movie.backdropPath})` }}
      >
        <div className="stage-content">
          <button className="back-link" onClick={() => navigate({ to: "/" })}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>영화 목록</span>
          </button>
          <div className="detail-copy">
            <h1 className="detail-title">{movie.title}</h1>
            <div className="original">
              <span>{movie.originalTitle}</span>
            </div>
            <div className="detail-meta">
              <span>{movie.releaseDate}</span>
              <span>•</span>
              <span>{movie.genres.join(" · ")}</span>
              <span>•</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="detail-main-container">
        <div className="poster-wrapper-detail">
          <img src={movie.posterPath} alt={movie.title} className="detail-poster" />
        </div>

        <section className="synopsis">
          <h2>{movie.tagline}</h2>
          <p>{movie.overview}</p>
          <div className="detail-actions">
            <button
              className={`bookmark-action-btn ${movie.isBookmarked ? "bookmarked" : ""}`}
              onClick={() => setIsBookmarked((prev) => !prev)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={movie.isBookmarked ? "#FFFFFF" : "none"}>
                <path
                  d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{movie.isBookmarked ? "즐겨찾기됨" : "즐겨찾기"}</span>
            </button>
          </div>
        </section>

        <aside className="rating-panel">
          <h2>내 평점</h2>
          <p>별점은 필수, 후기는 선택이에요.</p>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${star <= rating ? "active" : ""}`}
                onClick={() => setRating(star)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={star <= rating ? "#FFB800" : "none"}>
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    stroke={star <= rating ? "#FFB800" : "#606774"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>

          <textarea
            id="review-text"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button id="save-rating" type="button">
            평점 저장
          </button>
        </aside>
      </main>
    </div>
  );
}