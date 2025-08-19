import axiosInstance from "../../AxiosInstance";
// src/pages/modals/logoutmodal.jsx
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

// ===== 폰트 & 이미지 불러오기 =====
import JoyB from "../../fonts/TJJoyofsingingB_TTF.ttf"; // Bold 폰트
import mascot from "../../assets/연필조아용.png";        // 마스코트 이미지

// ===== 전역 폰트 + 스크롤 잠금 =====
const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: "TJJoyofsingingB";
    src: url(${JoyB}) format("truetype");
    font-weight: 700;
    font-display: swap;
  }
`;
const ScrollLock = createGlobalStyle`
  body { overflow: hidden; touch-action: none; }
`;

/* =========================================
 * ① 목데이터(가짜 API) — 개발용
 *    실제 연동 시 아래 함수를 axios 호출로 교체
 * ========================================= */
// (목) 로그아웃: 300ms 지연 후 성공
async function logoutMock() {
  await new Promise((r) => setTimeout(r, 300));
  // 실패 케이스 확인하고 싶으면 아래 주석 해제:
  // return { ok:false, message:"서버 오류로 로그아웃에 실패했어요." };
  return { ok: true };
}

/* =========================================
 * ② 실제 연동 시 교체할 포인트 (참고)
 * -----------------------------------------
 * import { api } from "../../lib/api";
 *
 * async function logoutReal() {
 *   const { data } = await api.post("/auth/logout");
 *   // 예: { ok:true }
 *   return { ok: data.ok, message: data.message };
 * }
 * ========================================= */

export default function LogoutModal({ onClose }) {
  const navigate = useNavigate();
  const cancelBtnRef = useRef(null);

  // ---------------------------
  // [연동 준비]
  // loading : 버튼/동작 로딩 상태
  // errorTop: 상단 에러(서버 오류 등)
  // ---------------------------
  const [loading, setLoading] = useState(false);
  const [errorTop, setErrorTop] = useState("");

  // ESC로 닫기 + 최초 포커스
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    cancelBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCancel = () => onClose?.();

  // const handleLogout = async () => {
  //   setErrorTop("");
  //   setLoading(true);
  //   try {
  //     // (목) 호출
  //     const res = await logoutMock();

  //     // (실제) 호출 예:
  //     // const res = await logoutReal();

  //     if (!res.ok) {
  //       setErrorTop(res.message || "로그아웃에 실패했어요.");
  //       return;
  //     }

  //     // ✅ 토큰/세션 정리
  //     localStorage.removeItem("accessToken");

  //     onClose?.();        // 먼저 모달 닫고
  //     navigate("/login"); // 로그인 페이지로 이동 (원하는 경로로 변경 가능)
  //   } catch (e) {
  //     setErrorTop("로그아웃 중 오류가 발생했어요.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleLogout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    console.log("로그아웃 성공:", response.data);
    localStorage.removeItem("accessToken");
    navigate("/login");

    return response.data;
  } catch (error) {
    console.error("오류:", error.response?.data || error.message);
    throw error; 
  }
};


  const modal = (
    <>
      <GlobalFonts />
      <ScrollLock />
      <Backdrop onClick={handleCancel}>
        <Dialog
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
          onClick={(e) => e.stopPropagation()} // 내부 클릭시 닫힘 방지
        >
          <Mascot src={mascot} alt="" aria-hidden="true" />
          {/* 상단 에러 */}
          {errorTop && <ErrorText role="alert">{errorTop}</ErrorText>}

          <Message id="logout-title">정말 로그아웃 하시겠어요?</Message>
          <Buttons>
            <Button
              data-variant="cancel"
              onClick={handleCancel}
              ref={cancelBtnRef}
              disabled={loading}
            >
              취소
            </Button>
            <Button
              data-variant="confirm"
              onClick={handleLogout}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "로그아웃중..." : "Logout"}
            </Button>
          </Buttons>
        </Dialog>
      </Backdrop>
    </>
  );

  // body 최상단으로 포털 렌더 → 레이아웃 밀림 없음
  return ReactDOM.createPortal(modal, document.body);
}

/* ===== styled-components ===== */

/* 화면 전체 덮는 반투명 배경 + 중앙 정렬 */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

/* 모달 카드 */
const Dialog = styled.div`
  position: relative;
  width: 18.75rem;           /* 300px */
  max-width: calc(100vw - 2rem);
  min-height: 9rem;          /* 144px */
  background: #fff;
  border-radius: 1.25rem;    /* 20px */
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.5rem 1rem 1rem; /* 마스코트 공간 + 패딩 */
  transform: translateY(-5%);/* 마스코트로 인한 시각 중심 보정 */
`;

/* 마스코트 */
const Mascot = styled.img`
  position: absolute;
  top: -2.8125rem;           /* -45px */
  left: 50%;
  transform: translateX(-50%);
  width: 9.375rem;           /* 150px */
  height: auto;
  pointer-events: none;
  user-select: none;
`;

/* 메시지 */
const Message = styled.p`
  color: #32885d;
  font-family: "TJJoyofsingingB", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  margin: 0.25rem 0 0.75rem; /* 에러 표시 공간 확보 */
  text-align: center;
`;

/* 상단 에러 */
const ErrorText = styled.p`
  margin: 0.25rem 0 0;
  color: #ff5656;
  font-size: 0.9375rem;
  font-family: "TJJoyofsingingB", sans-serif;
  text-align: center;
`;

/* 버튼 영역 */
const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

/* 버튼 */
const Button = styled.button`
  width: 7.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-family: "TJJoyofsingingB", sans-serif;
  font-weight: 700;
  cursor: pointer;

  &[data-variant="cancel"] { background: #e8e8e8; color: #32885d; }
  &[data-variant="confirm"] { background: #32885d; color: #fff; }

  &:disabled { opacity: 0.7; cursor: default; }
`;
