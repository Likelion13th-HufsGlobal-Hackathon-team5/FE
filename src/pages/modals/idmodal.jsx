// src/pages/modals/idmodal.jsx
import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

// ===== 폰트 & 이미지 =====
import JoyM from "../../fonts/TJJoyofsingingM_TTF.ttf"; // Medium
import JoyB from "../../fonts/TJJoyofsingingB_TTF.ttf"; // Bold
import mascot from "../../assets/연필조아용.png";        // 마스코트 이미지

// ===== 전역 폰트 주입 =====
const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: "TJJoyofsingingM";
    src: url(${JoyM}) format("truetype");
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: "TJJoyofsingingB";
    src: url(${JoyB}) format("truetype");
    font-weight: 700;
    font-display: swap;
  }
`;

/**
 * props:
 * - currentId: 기존 아이디(비교용). 예시로 "1234" 지정하지만 인풋은 비워둠.
 * - onClose: 모달 닫기 핸들러
 */
export default function IdModal({ currentId = "1234", onClose = () => {} }) {
  // 위 폼(기존 아이디) — 초기값 비움!
  const [prevId, setPrevId] = useState("");
  // 아래 폼(변경할 아이디)
  const [newId, setNewId] = useState("");
  const [isNewIdAvailable, setIsNewIdAvailable] = useState(null); // null | true | false

  // ESC 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // 기존 아이디 일치 여부
  const isPrevIdMatch = prevId.length > 0 && prevId === currentId;

  // 중복확인(예시): "test"면 중복
  const checkNewIdAvailability = () => {
    const v = newId.trim();
    if (!v) return setIsNewIdAvailable(false);
    setIsNewIdAvailable(v !== "test");
  };

  // 변경하기 활성 조건
  const canSubmit = isPrevIdMatch && isNewIdAvailable === true;

  // 버튼 동작
  const handleCancel = () => onClose(); // 언제나 닫힘
  const handleConfirm = () => {
    if (!canSubmit) return;             // 비활성 시 무반응
    console.log("아이디 변경:", { from: prevId, to: newId }); // TODO: API 연결
    onClose();                          // 활성(초록)일 때 닫힘
  };

  return (
    <>
      <GlobalFonts />
      <Wrap>
        <Card>
          <Inner>
            <Mascot src={mascot} alt="연필조아용" />
            {/* 상단 패딩 50px */}
            <div style={{ height: "3.125rem" }} />

            <FormArea>
              {/* 위 폼: 276px, 가운데 정렬 (초기값 비어 있음) */}
              <TopInput
                placeholder="기존 아이디"
                value={prevId}
                onChange={(e) => setPrevId(e.target.value)}
              />
              {prevId.length > 0 && (
                <Helper style={{ color: isPrevIdMatch ? "#00CA98" : "#FF5656" }}>
                  {isPrevIdMatch ? "기존 아이디가 맞아요!" : "기존 아이디가 일치하지 않습니다!"}
                </Helper>
              )}

              {/* 아래 폼: 입력 + 중복확인 버튼 (닉네임 모달과 동일) */}
              <IdRow style={{ marginTop: "1.25rem" }}>
                <IdInput
                  placeholder="변경할 아이디"
                  value={newId}
                  onChange={(e) => {
                    setNewId(e.target.value);
                    setIsNewIdAvailable(null); // 입력 바뀌면 다시 확인 필요
                  }}
                />
                <CheckButton type="button" onClick={checkNewIdAvailability}>
                  중복<br />확인
                </CheckButton>
              </IdRow>
              {isNewIdAvailable !== null && (
                <Helper style={{ color: isNewIdAvailable ? "#00CA98" : "#FF5656" }}>
                  {isNewIdAvailable ? "사용 가능한 아이디입니다!" : "이미 사용 중입니다!"}
                </Helper>
              )}
            </FormArea>

            <Buttons>
              <Button data-variant="cancel" onClick={handleCancel}>취소</Button>
              <Button
                data-variant="confirm"
                disabled={!canSubmit}
                onClick={handleConfirm}
              >
                변경하기
              </Button>
            </Buttons>
          </Inner>
        </Card>
      </Wrap>
    </>
  );
}

/* ===== styled-components ===== */

/* 모달(흰 배경) 300px */
const Wrap = styled.div`
  width: 18.75rem; /* 300px */
  margin: 6.875rem auto 0;
  overflow: visible;
`;

const Card = styled.div`
  position: relative;
  width: 18.75rem; /* 300px */
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
`;

/* 폼 폭 276px (닉네임 모달과 동일) */
const Inner = styled.div`
  --form-w: 17.25rem; /* 276px */
  --gap: 0.3125rem;   /* 5px  */
  --btn-w: 3.125rem;  /* 50px */
  --btn-h: 3rem;      /* 48px */
  --input-h: 3rem;
  --pad-x: 1rem;

  padding-top: 3.5rem; /* 마스코트 공간 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Mascot = styled.img`
  position: absolute;
  top: -2.8125rem;
  left: 50%;
  transform: translateX(-50%);
  width: 9.375rem;
  height: auto;
`;

const FormArea = styled.div`
  width: var(--form-w);
  margin-top: 0.25rem;
`;

/* 위 폼: 폭 276px, 가운데 정렬된 단일 input (초기값 비어 있음) */
const TopInput = styled.input`
  width: var(--form-w);
  height: var(--input-h);
  display: block;
  margin: 0 auto;
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F;
  border-radius: 0.625rem;
  font-size: 1rem;
  padding-left: var(--pad-x);
  outline: none;
  font-family: "TJJoyofsingingM", sans-serif;

  &::placeholder { font-family: "TJJoyofsingingM", sans-serif; }
`;

const IdRow = styled.div`
  width: var(--form-w);
  display: flex;
  align-items: center;
  gap: var(--gap);
`;

const IdInput = styled.input`
  height: var(--input-h);
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F;
  border-radius: 0.625rem;
  font-size: 1rem;
  padding-left: var(--pad-x);
  outline: none;
  font-family: "TJJoyofsingingM", sans-serif;
  width: calc(var(--form-w) - var(--btn-w) - var(--gap)); /* 276 - 50 - 5 */
`;

const CheckButton = styled.button`
  width: var(--btn-w);
  height: var(--btn-h);
  background-color: #32885D;
  color: #fff;
  font-size: 0.8125rem;
  border: none;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  text-align: center;
  font-family: "TJJoyofsingingB", sans-serif;
  cursor: pointer;
`;

const Helper = styled.p`
  margin: 0;
  padding-top: 0.625rem;
  font-size: 1rem;
  font-family: "TJJoyofsingingM", sans-serif;
  text-align: left;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 1rem 0;
  width: var(--form-w); /* 버튼도 폼 폭에 맞춤 */
`;

const Button = styled.button`
  flex: 1;
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
    background: #32885d; /* 활성(초록) */
    color: #fff;
  }
  &:disabled[data-variant="confirm"] {
    background: #ccc;    /* 비활성(회색) */
    color: #666;
    cursor: not-allowed;
  }
`;
