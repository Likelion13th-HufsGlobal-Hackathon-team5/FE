// src/pages/modals/passwordmodal.jsx
import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

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

/* ===== 비밀번호 변경 모달 ===== */
export default function PasswordModal({ savedPassword = "1234", onClose = () => {} }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // 기존 비밀번호 일치 여부
  const isCurrentMatch = useMemo(
    () => currentPw.length > 0 && currentPw === savedPassword,
    [currentPw, savedPassword]
  );
  const showCurrentMsg = currentPw.length > 0;

  // 새 비밀번호 === 확인 비밀번호
  const isPwMatched = useMemo(
    () => confirmPw.length > 0 && newPw === confirmPw,
    [newPw, confirmPw]
  );
  const showMatchMsg = confirmPw.length > 0;

  // 두 조건 모두 만족해야 변경 가능
  const canSubmit = isCurrentMatch && isPwMatched;

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCancel = () => onClose();
  const handleConfirm = () => {
    if (!canSubmit) return;
    onClose();
  };

  // === 여기서 핵심: 포털 + fixed 백드롭으로 부모 레이아웃에 영향 0 ===
  const modal = (
    <>
      <GlobalFonts />
      <ScrollLock />
      <Backdrop onClick={onClose}>
        <Dialog role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <Mascot src={mascot} alt="연필조아용" />

          {/* 기존 비밀번호 */}
          <InputBox>
            <Input
              type="password"
              placeholder="기존 비밀번호"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
            />
          </InputBox>
          {showCurrentMsg && (
            <Hint $ok={isCurrentMatch}>
              {isCurrentMatch ? "기존 비밀번호가 맞아요!" : "기존 비밀번호와 동일하지 않아요!"}
            </Hint>
          )}

          {/* 변경 비밀번호 (위 간격 30px) */}
          <InputBox style={{ marginTop: "1.875rem" /* 30px */ }}>
            <Input
              type="password"
              placeholder="변경할 비밀번호"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </InputBox>

          {/* 비밀번호 확인 (위 간격 20px) */}
          <InputBox style={{ marginTop: "1.25rem" /* 20px */ }}>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </InputBox>
          {showMatchMsg && (
            <Hint $ok={isPwMatched}>
              {isPwMatched ? "비밀번호가 일치합니다!" : "비밀번호가 일치하지 않아요!"}
            </Hint>
          )}

          {/* 버튼 */}
          <Buttons>
            <Button type="button" data-variant="cancel" onClick={handleCancel}>
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
              변경하기
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
