"use client";

import { useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const loginMutation = useLoginMutation();

  const canSubmit =
    EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <div className="auth-pane">
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <Link href="/login" className="text-link">
            로그인
          </Link>
        </div>

        <div className="form-group">
          <label className="field-label" htmlFor="email">이메일</label>
          <div className="field">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="field-label" htmlFor="password">비밀번호</label>
          <div className="field">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={!canSubmit || loginMutation.isPending}
        >
          {loginMutation.isPending ? "로그인 중" : "로그인"}
        </button>

        <div className="auth-footer">
          계정이 없으신가요?
          <Link href="/signup" className="text-link">회원가입</Link>
        </div>
      </form>
    </div>
  );
}
