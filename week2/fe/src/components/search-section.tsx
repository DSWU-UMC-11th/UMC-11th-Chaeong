import React from "react";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <section className="search-work">
      <div className="search-inner">
        <h1 className="search-title">어떤 영화를 찾고 있나요?</h1>
        <form id="movie-search-form" onSubmit={onSearchSubmit}>
          <div className="search-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#606774"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#606774"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="input-container">
            <input
              type="text"
              className="search-input"
              placeholder="예: 스파이더맨"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button type="submit" className="search-submit-btn">
            검색
          </button>
        </form>
      </div>
    </section>
  );
};
