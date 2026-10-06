import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({ search: nextQuery ? { query: nextQuery } : {} });
  }

  function handleClear() {
    setSearchText("");
    navigate({ search: {} });
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F6F7F9]">
      <main className="flex flex-col items-start px-4 sm:px-8 lg:px-20 py-6 w-full max-w-[1440px] box-border gap-0">
        {/* div.results-head */}
        <div className="flex flex-col items-start gap-[17px] w-full mb-4">
          <h1 className="font-bold text-[38px] leading-[44px] tracking-[-1.71px] text-[#17191E] m-0">
            영화 검색
          </h1>

          <form
            id="results-search-form"
            onSubmit={handleSubmit}
            className="box-border flex flex-row items-center pl-[15px] pr-[10px] gap-[18px] w-full h-[54px] bg-white border border-[#E3E6EB] rounded-[9px]"
          >
            {/* Search Icon */}
            <span className="flex items-center justify-center w-6 h-6 flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#606774" strokeWidth="2" />
                <path d="M21 21L16.65 16.65" stroke="#606774" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>

            {/* Input Container */}
            <div className="flex-1 flex items-center min-w-0">
              <input
                aria-label="검색어"
                className="w-full border-none outline-none font-bold text-sm leading-[17px] text-[#17191E] placeholder:text-[#969DA8] bg-transparent"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="영화 제목을 검색해 보세요"
              />
            </div>

            {/* Close / Clear Icon */}
            {searchText && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center justify-center w-6 h-6 border-none bg-transparent cursor-pointer p-0 flex-shrink-0"
                aria-label="검색어 지우기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#606774" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="box-border flex flex-row justify-center items-center px-4 w-[86px] h-[42px] bg-[#17191E] border border-white rounded-lg font-extrabold text-sm leading-[17px] text-white cursor-pointer flex-shrink-0 whitespace-nowrap"
            >
              {normalizedQuery ? "다시 검색" : "검색"}
            </button>
          </form>
        </div>

        {/* Search status & results */}
        {!normalizedQuery ? (
          <div className="w-full py-16 text-center">
            <p className="text-[#606774] font-medium text-base">검색어를 입력해 주세요.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            {/* div.results-toolbar */}
            <div className="box-border flex flex-row justify-between items-center w-full h-[54px] border-t border-b border-[#E3E6EB] my-4">
              <h2 id="results-title" className="font-bold text-[18px] leading-[21px] text-[#17191E] m-0">
                ‘{query}’ 검색 결과
              </h2>
              <span className="font-normal text-xs leading-[14px] text-[#969DA8]">
                영화 {searchResults.length}편
              </span>
            </div>

            {/* div.results-list */}
            <div className="w-full min-h-[400px]">
              {searchResults.length === 0 ? (
                <div className="w-full py-16 text-center">
                  <p className="text-[#606774] font-medium text-base">검색 결과가 없어요.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[36px] gap-y-0 w-full">
                  {searchResults.map((movie) => (
                    <article
                      key={movie.id}
                      className="box-border flex flex-row items-start py-[20px] gap-[18px] w-full border-b border-[#E3E6EB]"
                    >
                      {/* div.poster */}
                      <div className="flex flex-col justify-center items-start w-[126px] h-[190px] bg-[#F6F7F9] rounded-[10px] overflow-hidden flex-shrink-0">
                        <img
                          src={movie.posterPath}
                          alt={`${movie.title} 포스터`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex flex-col items-start gap-2 flex-1 min-w-0 py-1">
                        <h3 className="font-bold text-[18px] leading-[24px] text-[#17191E] truncate w-full m-0">
                          {movie.title}
                        </h3>

                        <div className="flex flex-row items-center gap-2 font-normal text-xs leading-[14px] text-[#969DA8]">
                          <span>{movie.originalTitle}</span>
                          <span>·</span>
                          <span>{movie.releaseDate}</span>
                        </div>

                        <p className="font-normal text-[12.5px] leading-[20px] text-[#606774] line-clamp-3 m-0">
                          {movie.overview}
                        </p>

                        <Link
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                          className="flex flex-row items-center gap-1 text-[#2563EB] font-extrabold text-xs leading-[14px] mt-1 hover:underline"
                        >
                          <span>상세 보기</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}