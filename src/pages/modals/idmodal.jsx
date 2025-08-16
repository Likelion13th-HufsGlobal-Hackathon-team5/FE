// src/pages/modals/logoutmodal.jsx
import React, { useEffect, useRef } from "react";
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

export default function LogoutModal({ onClose }) {
  const navigate = useNavigate();
  const cancelBtnRef = useRef(null);

  // ESC로 닫기 + 최초 포커스
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    cancelBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCancel = () => onClose?.();

  const handleLogout = () => {
    onClose?.();          // 먼저 모달 닫고
    navigate("/login");   // 로그인 페이지로 이동
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
          <Message id="logout-title">정말 로그아웃 하시겠어요?</Message>
          <Buttons>
            <Button
              data-variant="cancel"
              onClick={handleCancel}
              ref={cancelBtnRef}
            >
              취소
            </Button>
            <Button data-variant="confirm" onClick={handleLogout}>
              Logout
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
  height: 9rem;              /* 144px (기존 유지) */
  background: #fff;
  border-radius: 1.25rem;    /* 20px */
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.5rem;       /* 마스코트 공간 */
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
  margin: auto 0;            /* 수직 가운데 */
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
`;
