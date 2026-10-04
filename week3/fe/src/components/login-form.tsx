import React, { useState } from "react";

export const LoginForm: React.FC<{ onNavigateToSignup?: () => void }> = ({
  onNavigateToSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="auth-pane">
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h1>로그인</h1>
        </div>

        <div className="form-group">
          <div className="field-label">
            <label htmlFor="login-email">이메일</label>
          </div>
          <div className="field">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#606774"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#606774"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="field-label">
            <label htmlFor="login-password">비밀번호</label>
          </div>
          <div className="field">
            <span className="field-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="#606774"
                  strokeWidth="2"
                />
                <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke="#606774" strokeWidth="2" />
              </svg>
            </span>
            <input
              id="login-password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="login-submit-btn">
          로그인
        </button>

        <div className="auth-footer">
          <span>처음이신가요? </span>
          <button type="button" className="text-link" onClick={onNavigateToSignup}>
            회원가입
          </button>
        </div>
      </form>
    </main>
  );
};
