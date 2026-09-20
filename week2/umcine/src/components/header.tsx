import React from "react";

interface HeaderProps {
  currentTab: "movies" | "search" | "login" | "profile";
  onTabChange: (tab: "movies" | "search" | "login" | "profile") => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  return (
    <header className="topbar">
      <div className="brand-row">
        <div className="brand" onClick={() => onTabChange("movies")} style={{ cursor: "pointer" }}>
          <span className="mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z"
                stroke="#17191E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 4V20M17 4V20M3 12H21M3 8H7M3 16H7M17 8H21M17 16H21"
                stroke="#17191E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="logo-text">UMCine</span>
        </div>
        <nav className="main-menu">
          <button
            className={`menu-item ${currentTab === "movies" ? "active" : ""}`}
            onClick={() => onTabChange("movies")}
          >
            영화
          </button>
          <button
            className={`menu-item ${currentTab === "search" ? "active" : ""}`}
            onClick={() => onTabChange("search")}
          >
            검색
          </button>
          <button
            className={`menu-item ${currentTab === "profile" ? "active" : ""}`}
            onClick={() => onTabChange("profile")}
          >
            내 정보
          </button>
        </nav>
      </div>

      <div className="top-actions">
        <button
          className="search-btn"
          onClick={() => onTabChange("search")}
          aria-label="영화 검색"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
        </button>
        <button
          className="login-btn"
          onClick={() => onTabChange("login")}
        >
          로그인
        </button>
      </div>
    </header>
  );
};
