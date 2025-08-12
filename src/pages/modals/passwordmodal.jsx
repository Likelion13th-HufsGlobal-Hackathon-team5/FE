// src/pages/modals/passwordmodal.jsx
import React, { useMemo, useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

/* ===== 폰트 & 이미지 불러오기 ===== */
import JoyM from "../../fonts/TJJoyofsingingM_TTF.ttf"; // Medium
import JoyB from "../../fonts/TJJoyofsingingB_TTF.ttf"; // Bold
import mascot from "../../assets/연필조아용.png";        // 마스코트

/* ===== 전역 폰트 등록 ===== */
const GlobalFonts = createGlobalStyle`
  @font-face { font-family: "TJJoyofsingingM"; src: url(${JoyM}) format("truetype"); font-weight: 500; }
  @font-face { font-family: "TJJoyofsingingB"; src: url(${JoyB}) format("truetype"); font-weight: 700; }
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

  // ESC로 닫기 (옵션)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCancel = () => onClose();
  const handleConfirm = () => {
    if (!canSubmit) return;   // 조건 불만족이면 아무 것도 안 함
    onClose();                // 조건 만족 시 모달 닫기
  };

  return (
    <>
      <GlobalFonts />
      <Wrap>
        <Card>
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
        </Card>
      </Wrap>
    </>
  );
}

/* ===== 중앙 정렬 컨테이너 (가로 300px, 상단 여백 110px) ===== */
const Wrap = styled.div`
  width: 18.75rem;            /* 300px */
  margin: 6.875rem auto 0;    /* 110px auto 0 */
  overflow: visible;
`;

/* ===== 카드 (가로 300px, 세로 자동, 상단 패딩 66px) ===== */
const Card = styled.div`
  position: relative;
  width: 18.75rem;            /* 300px */
  background: #fff;
  border-radius: 1.25rem;     /* 20px */
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,.15); /* 0 4px 12px */
  padding: 4.125rem 1.25rem 1.25rem; /* 66px 20px 20px */
`;

/* ===== 마스코트 (위로 -45px, 가로 150px) ===== */
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

/* ===== 인풋 래퍼 (가운데 정렬) ===== */
const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* ===== 인풋 (가로 240px, 높이 40px, R=10px) ===== */
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

/* ===== 검증 문구 (초록 #00CA98 / 빨강 #FF5656) ===== */
const Hint = styled.p`
  margin: 0.5rem 0 0 0.25rem; /* 8px 0 0 4px */
  font-size: 0.875rem;        /* 14px */
  font-family: "TJJoyofsingingM", sans-serif;
  color: ${({ $ok }) => ($ok ? "#00CA98" : "#FF5656")};
`;

/* ===== 버튼 영역 (간격 12px, 상단 여백 20px) ===== */
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;               /* 12px */
  margin-top: 1.25rem;        /* 20px */
`;

/* ===== 버튼 (가로 120px, 높이 40px, R=20px) ===== */
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
