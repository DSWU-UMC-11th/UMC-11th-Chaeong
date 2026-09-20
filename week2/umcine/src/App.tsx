import { useState } from "react";
import { Header } from "./components/header";
import { MovieGrid } from "./components/movie-grid";
import { Pagination } from "./components/pagination";
import { SearchSection } from "./components/search-section";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import { ProfileSection } from "./components/profile-section";
import { ProfileEdit } from "./components/profile-edit";
import { MovieDetail } from "./components/movie-detail";
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import "./App.css";

type TabType = "movies" | "search" | "login" | "signup" | "profile" | "profile-edit" | "detail";

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>("movies");
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
    if (selectedMovie && selectedMovie.id === id) {
      setSelectedMovie((prev) => (prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null));
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentTab("detail");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredMovies = searchQuery.trim()
    ? movieList.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : movieList;

  const bookmarkedMovies = movieList.filter((m) => m.isBookmarked);

  const getHeaderTab = () => {
    if (currentTab === "profile-edit") return "profile";
    if (currentTab === "signup") return "login";
    if (currentTab === "detail") return "movies";
    return currentTab as "movies" | "search" | "login" | "profile";
  };

  return (
    <div className="app-container">
      <Header currentTab={getHeaderTab()} onTabChange={(tab) => setCurrentTab(tab)} />

      {currentTab === "movies" && (
        <main className="main-container">
          <h1 className="page-title">영화 목록</h1>
          {movieList.length === 0 ? (
            <p className="no-movies">표시할 영화가 없어요.</p>
          ) : (
            <MovieGrid
              movies={movieList}
              onToggleBookmark={handleToggleBookmark}
              onSelectMovie={handleSelectMovie}
            />
          )}
          <Pagination currentPage={1} totalPages={5} />
        </main>
      )}

      {currentTab === "search" && (
        <main className="search-page-container">
          <SearchSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />
          {searchQuery.trim() && (
            <section className="search-results-section">
              <h2 className="search-results-title">검색 결과</h2>
              {filteredMovies.length === 0 ? (
                <p className="no-movies">검색 결과가 없습니다.</p>
              ) : (
                <MovieGrid
                  movies={filteredMovies}
                  onToggleBookmark={handleToggleBookmark}
                  onSelectMovie={handleSelectMovie}
                />
              )}
            </section>
          )}
          <Pagination currentPage={1} totalPages={1} />
        </main>
      )}

      {currentTab === "login" && (
        <LoginForm onNavigateToSignup={() => setCurrentTab("signup")} />
      )}

      {currentTab === "signup" && (
        <SignupForm onNavigateToLogin={() => setCurrentTab("login")} />
      )}

      {currentTab === "profile" && (
        <ProfileSection
          bookmarkedMovies={bookmarkedMovies}
          onToggleBookmark={handleToggleBookmark}
          onEditProfileClick={() => setCurrentTab("profile-edit")}
          onSelectMovie={handleSelectMovie}
        />
      )}

      {currentTab === "profile-edit" && (
        <ProfileEdit onSave={() => setCurrentTab("profile")} />
      )}

      {currentTab === "detail" && selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onBack={() => setCurrentTab("movies")}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </div>
  );
}