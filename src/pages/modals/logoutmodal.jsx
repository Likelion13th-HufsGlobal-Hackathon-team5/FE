// src/pages/modals/logoutmodal.jsx
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom"; 

// ===== 폰트 & 이미지 불러오기 =====
import JoyB from "../../fonts/TJJoyofsingingB_TTF.ttf"; // Bold 폰트
import mascot from "../../assets/연필조아용.png";        // 마스코트 이미지

// ===== 전역 폰트 등록 =====
const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: "TJJoyofsingingB";
    src: url(${JoyB}) format("truetype");
    font-weight: 700;
    font-display: swap;
  }
`;

export default function LogoutModal({ onClose }) { // onClose prop 받기
  const navigate = useNavigate();

  const handleCancel = () => {
    onClose?.();                 // 모달 닫기
  };

  const handleLogout = () => {
    onClose?.();                 // 닫고
    navigate("/login");          // 로그인 페이지로 이동 (라우트에 맞게 변경 가능)
  };

  return (
    <>
      <GlobalFonts />
      <Wrap role="dialog" aria-modal="true">
        <Card>
          <Mascot src={mascot} alt="연필조아용" />
          <Message>정말 로그아웃 하시겠어요?</Message>
          <Buttons>
            <Button data-variant="cancel" onClick={handleCancel}>취소</Button>
            <Button data-variant="confirm" onClick={handleLogout}>Logout</Button>
          </Buttons>
        </Card>
      </Wrap>
    </>
  );
}

/* 중앙 정렬 컨테이너 (가로 300px, 상단 여백 110px) */
const Wrap = styled.div`
  width: 18.75rem; /* 300px */
  margin: 6.875rem auto 0; /* 110px */
  overflow: visible;
`;

/* 모달 카드 (가로 300px, 세로 144px) */
const Card = styled.div`
  position: relative;
  width: 18.75rem; /* 300px */
  height: 9rem; /* 144px */
  background: #fff;
  border-radius: 1.25rem; /* 20px */
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.5rem; /* 56px */
`;

/* 마스코트 이미지 (위로 -45px, 가로 150px) */
const Mascot = styled.img`
  position: absolute;
  top: -2.8125rem; /* -45px */
  left: 50%;
  transform: translateX(-50%);
  width: 9.375rem; /* 150px */
  height: auto;
  pointer-events: none;
  user-select: none;
`;

/* 모달 메시지 */
const Message = styled.p`
  color: #32885d;
  font-family: "TJJoyofsingingB", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  margin-top: auto;
  margin-bottom: auto;
`;

/* 버튼 영역 */
const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

/* 버튼 스타일 */
const Button = styled.button`
  width: 7.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-family: "TJJoyofsingingB", sans-serif;
  font-weight: 700;
  cursor: pointer;

  &[data-variant="cancel"] {
    background: #e8e8e8;
    color: #32885d;
  }
  &[data-variant="confirm"] {
    background: #32885d;
    color: #fff;
  }
`;
