import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { MovieCard } from "../../components/movies/movie-card";
import { Pagination } from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";

export function MyInfoPage() {
  const [page, setPage] = useState(1);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());


  const moviesQuery = useQuery({
    queryKey: ["movies", "bookmarks", { page }],
    queryFn: () => getMovies({ page }),
    placeholderData: keepPreviousData,
  });

  const movies = (moviesQuery.data?.results ?? []).slice(0, 3).map((movie) => ({
    ...movie,
    isBookmarked: true,
  }));
  const totalPages = 1;

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
              <strong className="profile-nickname-display">gs0428</strong>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <strong>gwangsoo@cinemalab.kr</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-bookmarks-section">
        <h2>내 즐겨찾기</h2>
        {moviesQuery.isPending ? (
          <p className="no-bookmarks">로딩 중...</p>
        ) : movies.length === 0 ? (
          <p className="no-bookmarks">즐겨찾기한 영화가 없습니다.</p>
        ) : (
          <div className="profile-movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleBookmark={handleToggleBookmark}
              />
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
