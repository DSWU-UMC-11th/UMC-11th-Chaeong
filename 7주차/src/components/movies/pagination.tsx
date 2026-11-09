import React from "react";
import tmdbLogo from "../../images/logos/tmdb-logo.svg";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (nextPage: number) => void;
}

const PAGE_GROUP_SIZE = 5;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const groupStart =
    Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, index) => groupStart + index
  );

  return (
    <>
      <div className="pagination-container">
        <button
          className="nav-arrow"
          disabled={currentPage <= 1}
          aria-label="이전 페이지"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#D9E5FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="page-buttons">
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              className={`page-btn ${pageNum === currentPage ? "active" : ""}`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}
        </div>
        <button
          className="nav-arrow"
          disabled={currentPage >= totalPages}
          aria-label="다음 페이지"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="#606774"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <footer className="footer-topbar">
        <img src={tmdbLogo} alt="tmdb logo" className="tmdb-logo" />
        <span className="footer-text">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </span>
      </footer>
    </>
  );
};