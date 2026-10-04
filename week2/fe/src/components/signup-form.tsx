import React, { useState } from "react";

export const SignupForm: React.FC<{ onNavigateToLogin: () => void }> = ({
  onNavigateToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="auth-pane">
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="signup-header">
          <h1>회원가입</h1>
        </div>

        <div className="form-group">
          <div className="field-label">
            <label htmlFor="signup-email">이메일</label>
          </div>
          <div className="field">
            <input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" className="text-link">
              중복 확인
            </button>
          </div>
        </div>

        <div className="form-group">
          <div className="field-label">
            <label htmlFor="signup-nickname">닉네임</label>
          </div>
          <div className="field">
            <input
              id="signup-nickname"
              type="text"
              placeholder="2–12자"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button type="button" className="text-link">
              중복 확인
            </button>
          </div>
        </div>

        <div className="form-group password-group">
          <div className="field-label">
            <label htmlFor="signup-password">비밀번호</label>
          </div>
          <div className="field">
            <input
              id="signup-password"
              type="password"
              placeholder="8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="password-hint">
            영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
          </p>
        </div>

        <div className="form-group">
          <div className="field-label">
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
          </div>
          <div className="field">
            <input
              id="signup-password-confirm"
              type="password"
              placeholder="다시 입력"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="signup-submit-btn">
          가입하기
        </button>

        <div className="auth-footer">
          <span>이미 계정이 있나요? </span>
          <button type="button" className="text-link" onClick={onNavigateToLogin}>
            로그인
          </button>
        </div>
      </form>
    </main>
  );
};
