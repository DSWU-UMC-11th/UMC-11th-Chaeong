import { useRef, useState } from "react";

export function MyInfoEditPage() {
  const [nickname, setNickname] = useState("gs0428");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("최대 5MB까지 업로드할 수 있어요.");
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const handleCheckDuplicate = () => {
    console.log("중복 확인:", nickname);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved nickname:", nickname);
  };

  const handleDelete = () => {
    if (window.confirm("정말 탈퇴하시겠어요?")) {
      console.log("회원 탈퇴");
    }
  };

  return (
    

      <main className="profile-shell">
        <div className="profile-head">
          <div className="profile-head-info">
            <h1 className="profile-edit-title">내 정보 수정</h1>
            <p className="page-desc">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
          </div>
          <button type="submit" form="profile-form" className="save-changes-btn">
            변경사항 저장
          </button>
        </div>

        <form id="profile-form" onSubmit={handleSubmit}>
          <section className="edit-block">
            <div className="edit-block-row">
              <div className="profile-head-avatar">
                <div className="avatar-wrapper">
                  <span className="avatar">
                    {preview ? (
                      <img src={preview} alt="프로필 이미지" />
                    ) : (
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
                    )}
                  </span>
                  <button
                    type="button"
                    className="avatar-edit-badge"
                    aria-label="프로필 이미지 변경"
                    onClick={() => fileRef.current?.click()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 20H21M16.5 3.5C16.9 3.1 17.4 2.9 18 2.9C18.3 2.9 18.5 2.9 18.8 3.1C19.1 3.2 19.3 3.4 19.5 3.6C19.7 3.8 19.8 4 19.9 4.3C20 4.6 20.1 4.9 20.1 5.1C20.1 5.4 20 5.7 19.9 5.9C19.8 6.2 19.7 6.4 19.5 6.6L7 19L3 20L4 16L16.5 3.5Z"
                        stroke="#17191E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </div>
                <span className="avatar-label">프로필 이미지</span>
                <span className="avatar-hint">선택 사항 · 최대 5MB</span>
              </div>

              <div className="profile-fields">
                <div className="form-group">
                  <label className="field-label" htmlFor="profile-nickname">
                    닉네임
                  </label>
                  <div className="field">
                    <input
                      id="profile-nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                      type="button"
                      id="profile-nickname-check"
                      className="text-link"
                      onClick={handleCheckDuplicate}
                    >
                      중복 확인
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="field-label" htmlFor="profile-email">
                    이메일
                  </label>
                  <div className="field">
                    <input
                      id="profile-email"
                      value="gwangsoo@cinemalab.kr"
                      readOnly
                    />
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
          <button type="button" id="open-delete-dialog" onClick={handleDelete}>
            회원 탈퇴
          </button>
        </section>
      </main>
  );
}