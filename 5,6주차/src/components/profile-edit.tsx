import React, { useState } from "react";

interface ProfileEditProps {
  onSave: (nickname: string) => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({ onSave }) => {
  const [nickname, setNickname] = useState("gs0428");
  const email = "gwangsoo@cinemalab.kr";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(nickname);
  };

  return (
    <main className="profile-shell">
      <div className="profile-head">
        <div>
          <h1 className="profile-edit-title">내 정보 수정</h1>
          <p className="page-desc">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
        </div>
        <button className="save-changes-btn" onClick={handleSubmit}>
          변경사항 저장
        </button>
      </div>

      <form id="profile-form" onSubmit={handleSubmit}>
        <section className="edit-block">
          <div className="profile-head-avatar">
            <div className="avatar-wrapper">
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
              <button type="button" className="avatar-edit-badge" aria-label="프로필 이미지 수정">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="#17191E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                    stroke="#17191E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <span className="avatar-label">프로필 이미지</span>
            <span className="avatar-hint">선택 사항 · 최대 5MB</span>
          </div>

          <div className="profile-fields">
            <div className="form-group">
              <div className="field-label">
                <label htmlFor="profile-nickname">닉네임</label>
              </div>
              <div className="field">
                <input
                  id="profile-nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button type="button" id="profile-nickname-check" className="text-link">
                  중복 확인
                </button>
              </div>
            </div>

            <div className="form-group">
              <div className="field-label">
                <label htmlFor="profile-email">이메일</label>
              </div>
              <div className="field disabled">
                <input id="profile-email" type="email" value={email} disabled />
              </div>
            </div>
          </div>
        </section>
      </form>

      <section className="danger-zone">
        <div className="danger-info">
          <h3>회원 탈퇴</h3>
          <p>탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p>
        </div>
        <button type="button" id="open-delete-dialog">
          회원 탈퇴
        </button>
      </section>
    </main>
  );
};
