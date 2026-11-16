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
        <div className="profile-head-info">
          <h1 className="profile-edit-title">내 정보 수정</h1>
          <p className="page-desc">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
        </div>
        <button className="save-changes-btn" onClick={handleSubmit}>
          변경사항 저장
        </button>
      </div>

      <form id="profile-form" onSubmit={handleSubmit}>
        <section className="edit-block">
          <div className="edit-block-row">
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
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M11.3333 2.00004C11.5084 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.617 1.68605 13.825 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38312 14.4088 2.61188C14.5035 2.84064 14.5523 3.08586 14.5523 3.33337C14.5523 3.58089 14.5035 3.82611 14.4088 4.05487C14.314 4.28363 14.1751 4.49162 14 4.66671L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00004Z"
                      stroke="#17191E"
                      strokeWidth="1.5"
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
