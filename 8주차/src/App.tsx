import { useState } from "react";
import { MovieGrid } from "./components/movies/movie-grid";
import { Pagination } from "./components/movies/pagination";
import { ProfileSection } from "./components/profile-section"; // 경로는 맞춰서
import { ProfileEdit } from "./components/profile-edit";       // 경로는 맞춰서
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import "./App.css";

type Page = "movies" | "profile" | "profile-edit";

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState<Page>("movies");

  const handleToggleBookmark = (id: number) => {
    // 기존 그대로
  };

  const bookmarkedMovies = movieList.filter((m) => m.isBookmarked);

  return (
    <div className="app-container">
      {page === "movies" && (
        <main className="main-container">
          <h1 className="page-title">영화 목록</h1>
          <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
          <Pagination currentPage={1} totalPages={5} />
        </main>
      )}

      {page === "profile" && (
        <ProfileSection
          bookmarkedMovies={bookmarkedMovies}
          onToggleBookmark={handleToggleBookmark}
          onEditProfileClick={() => setPage("profile-edit")}
        />
      )}

      {page === "profile-edit" && (
        <ProfileEdit
          onSave={(nickname) => {
            // 닉네임 저장 처리
            setPage("profile");
          }}
        />
      )}

      <p className="text-xs text-[#969DA8] mt-2">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
}