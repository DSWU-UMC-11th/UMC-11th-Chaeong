import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { Pagination } from "../../components/movies/pagination";
import { useFavoritesQuery } from "../../hooks/use-favorite-query";
import { useMeQuery } from "../../hooks/use-me-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";

export function MyInfoPage() {
  const [page, setPage] = useState(1);

  const meQuery = useMeQuery();
  const me = meQuery.data;

  const favoritesQuery = useFavoritesQuery();
  const favoriteIds = (favoritesQuery.data ?? []).map((f) => f.movieId);

  // 즐겨찾기한 영화 id마다 TMDB 상세 조회 (영화 상세 페이지와 같은 queryKey라 캐시 공유)
  const favoriteMovieQueries = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ["movies", "detail", id],
      queryFn: () => getMovieDetail(id),
    })),
  });

  const favoriteMovies = favoriteMovieQueries
    .map((q) => q.data)
    .filter((m) => m !== undefined);

  const isMoviesLoading = favoriteMovieQueries.some((q) => q.isLoading);

  const totalPages = 1;

  return (
    <main className="profile-container">
      <div className="profile-overview-head">
        <h1 className="profile-title">내 정보</h1>
        <Link to="/my-info/edit" className="edit-info-btn">
          정보 수정
        </Link>
      </div>

      <section className="profile-info-block">
        <h2>기본 정보</h2>
        <div className="profile-info-content">
          <span className="avatar">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="#17191E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="7" r="4" stroke="#17191E" strokeWidth="2" />
            </svg>
          </span>
          <div className="info-grid">
            <div className="info-item">
              <label>닉네임</label>
              <strong className="profile-nickname-display">{me?.nickname}</strong>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <strong>{me?.email}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-bookmarks-section">
        <h2>내 즐겨찾기</h2>
        {favoritesQuery.isLoading || isMoviesLoading ? (
          <p className="no-bookmarks">로딩 중...</p>
        ) : favoritesQuery.isError ? (
          <p className="no-bookmarks">즐겨찾기를 불러오지 못했어요.</p>
        ) : favoriteMovies.length === 0 ? (
          <p className="no-bookmarks">즐겨찾기한 영화가 없습니다.</p>
        ) : (
          <div className="profile-movie-grid">
            {favoriteMovies.map((movie) => (
              <Link
                key={movie.id}
                to="/movies/$movieId"
                params={{ movieId: String(movie.id) }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: 10 }}
                />
                <strong>{movie.title}</strong>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}