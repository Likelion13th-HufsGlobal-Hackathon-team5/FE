// src/pages/modals/passwordmodal.jsx
import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import axiosInstance from "../../AxiosInstance";

/* ===== 폰트 & 이미지 불러오기 ===== */
import JoyM from "../../fonts/TJJoyofsingingM_TTF.ttf"; // Medium
import JoyB from "../../fonts/TJJoyofsingingB_TTF.ttf"; // Bold
import mascot from "../../assets/연필조아용.png";        // 마스코트

/* ===== 전역 폰트 등록 & 스크롤 잠금 ===== */
const GlobalFonts = createGlobalStyle`
  @font-face { font-family: "TJJoyofsingingM"; src: url(${JoyM}) format("truetype"); font-weight: 500; }
  @font-face { font-family: "TJJoyofsingingB"; src: url(${JoyB}) format("truetype"); font-weight: 700; }
`;
const ScrollLock = createGlobalStyle`
  body { overflow: hidden; touch-action: none; }
`;

/* =========================================
 * ① 목데이터(가짜 API) — 개발용
 *    실제 연동 시 아래 함수들을 axios 호출로 교체
 * ========================================= */

// (목) 기존 비밀번호 검증: savedPassword와 일치해야 ok
async function verifyPasswordMock({ savedPassword, inputPassword }) {
  await new Promise((r) => setTimeout(r, 350)); // 네트워크 지연 흉내
  const ok = !!inputPassword && inputPassword === savedPassword;
  return { ok, message: ok ? "확인 완료" : "기존 비밀번호가 올바르지 않습니다." };
}

// (목) 비밀번호 변경: 🔥 4자 이상 조건 제거! 공백만 아니면 통과
async function updatePasswordMock({ newPassword }) {
  await new Promise((r) => setTimeout(r, 450));
  if (!newPassword?.trim()) return { ok: false, message: "새 비밀번호를 입력해 주세요." };
  // 길이 제한 없음
  return { ok: true };
}

/* =========================================
 * ② 실제 연동 시 교체할 포인트 (참고)
 * -----------------------------------------
 * import { api } from "../../lib/api";
 *
 * async function verifyPassword({ inputPassword }) {
 *   const { data } = await api.post("/auth/verify-password", { password: inputPassword });
 *   return { ok: data.ok, message: data.message };
 * }
 *
 * async function updatePassword({ newPassword }) {
 *   const { data } = await api.patch("/user/password", { newPassword });
 *   return { ok: data.ok, message: data.message };
 * }
 * ========================================= */

/* ===== 비밀번호 변경 모달 ===== */
export default function PasswordModal({ savedPassword = "1234", onClose = () => {}, onChanged }) {
  // ---------------------------
  // [연동 준비]
  // currentPw : 기존 비밀번호 입력
  // newPw, confirmPw : 새 비밀번호 / 확인
  // loading : 버튼 로딩 상태
  // errorTop : 상단 에러(서버/검증 실패)
  // ---------------------------
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorTop, setErrorTop] = useState("");
  const [userData, setUserData] = useState(null);



  // 새 비밀번호 === 확인 비밀번호 (UI 피드백용)
  const isPwMatched = useMemo(
    () => confirmPw.length > 0 && newPw === confirmPw,
    [newPw, confirmPw]
  );
  const showMatchMsg = confirmPw.length > 0;

  const canSubmit = isPwMatched && !loading;


  
  useEffect(() => {
    axiosInstance.get("mypage/user").then((res) => {
      setUserData(res.data);
      console.log(res.data);
      
    });
  }, []);

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCancel = () => onClose();

  // ===== 변경하기 (목 API 순서: 검증 → 변경) =====
  const handleConfirm = async () => {
  if (!canSubmit) return;
  setLoading(true);
  setErrorTop("");

  try {
    // PATCH 요청 (body는 일단 빈 객체)

    const requestBody = {
      nickname: userData?.nickname,
      birthyear: userData?.birthYear,
      password: newPw,
      passwordConfirm: confirmPw
    };
    console.log("PATCH request body:", requestBody);
    const response = await axiosInstance.patch("mypage/user-edit", requestBody);
    // 성공 처리
    if (response.status === 200) {
      onChanged?.(); // 부모에게 알림
      onClose();
    } else {
      setErrorTop("비밀번호 변경에 실패했습니다.");
    }
  } catch (e) {
    
    setErrorTop("비밀번호 변경 중 오류가 발생했습니다.");
  } finally {
    setLoading(false);
  }
};


  // === 여기서 핵심: 포털 + fixed 백드롭으로 부모 레이아웃에 영향 0 ===
  const modal = (
    <>
      <GlobalFonts />
      <ScrollLock />
      <Backdrop onClick={onClose}>
        <Dialog role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <Mascot src={mascot} alt="연필조아용" />

          {/* 상단 에러 */}
          {errorTop && <TopError role="alert">{errorTop}</TopError>}

          {/* 변경 비밀번호 (위 간격 30px) */}
          <InputBox style={{ marginTop: "1.875rem" /* 30px */ }}>
            <Input
              type="password"
              placeholder="변경할 비밀번호"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              disabled={loading}
            />
          </InputBox>

          {/* 비밀번호 확인 (위 간격 20px) */}
          <InputBox style={{ marginTop: "1.25rem" /* 20px */ }}>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              disabled={loading}
            />
          </InputBox>
          {showMatchMsg && (
            <Hint $ok={isPwMatched}>
              {isPwMatched ? "비밀번호가 일치합니다!" : "비밀번호가 일치하지 않아요!"}
            </Hint>
          )}

          {/* 버튼 */}
          <Buttons>
            <Button type="button" data-variant="cancel" onClick={handleCancel} disabled={loading}>
              취소
            </Button>
            <Button
              type="button"
              data-variant="confirm"
              onClick={handleConfirm}
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              title={!canSubmit ? "기존 비밀번호/새 비밀번호 확인을 완료하세요" : "비밀번호 변경"}
            >
              {loading ? "변경중..." : "변경하기"}
            </Button>
          </Buttons>
        </Dialog>
      </Backdrop>
    </>
  );

  // body로 포털 렌더 → 페이지가 아래로 안 밀림
  return ReactDOM.createPortal(modal, document.body);
}

/* ====== 스타일 ====== */
/* 화면 전체를 덮는 반투명 배경 + 중앙정렬 (레이아웃 영향 X) */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

/* 모달 박스 */
const Dialog = styled.div`
  position: relative;
  width: 18.75rem;
  max-width: calc(100vw - 2rem);
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.15);
  padding: 4.125rem 1.25rem 1.25rem;
  transform: translateY(-5%);  /* 중앙 기준에서 위로 5% 올림 */
`;

/* 마스코트 (모달 상단 밖으로 살짝) */
const Mascot = styled.img`
  position: absolute;
  top: -2.8125rem;            /* -45px */
  left: 50%;
  transform: translateX(-50%);
  width: 9.375rem;            /* 150px */
  height: auto;
  pointer-events: none;
  user-select: none;
`;

const TopError = styled.p`
  margin: 0 0 0.5rem 0.25rem;
  color: #ff5656;
  font-size: 0.9375rem;
  font-family: "TJJoyofsingingM", sans-serif;
  text-align: left;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 15rem;               /* 240px */
  height: 2.5rem;             /* 40px */
  padding: 0 0.75rem;         /* 12px */
  border: 0.125rem solid #9aa0a6; /* 2px */
  border-radius: 0.625rem;    /* 10px */
  font-family: "TJJoyofsingingM", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;        /* 14px */
  ::placeholder { color: #bdbdbd; }
  :focus { outline: none; border-color: #32885d; }
`;

const Hint = styled.p`
  margin: 0.5rem 0 0 0.25rem; /* 8px 0 0 4px */
  font-size: 0.875rem;        /* 14px */
  font-family: "TJJoyofsingingM", sans-serif;
  color: ${({ $ok }) => ($ok ? "#00CA98" : "#FF5656")};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;               /* 12px */
  margin-top: 1.25rem;        /* 20px */
`;

const Button = styled.button`
  width: 7.5rem;              /* 120px */
  height: 2.5rem;             /* 40px */
  border: none;
  border-radius: 1.25rem;     /* 20px */
  font-size: 0.875rem;        /* 14px */
  font-family: "TJJoyofsingingB", sans-serif;
  font-weight: 700;
  cursor: pointer;

  &[data-variant="cancel"] { background: #E8E8E8; color: #32885D; }
  &[data-variant="confirm"]{ background: #32885D; color: #fff; }

  &:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;
