// src/pages/modals/namemodal.jsx
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

export default function NameModal({ onClose = () => {} }) {
  const [nickname, setNickname] = useState("");
  const [isNickAvailable, setIsNickAvailable] = useState(null);

  // 회원가입과 동일한 로직
  const checkNickAvailability = () => {
    const v = nickname.trim();
    if (v.length < 1) {
      setIsNickAvailable(false);
      return;
    }
    if (v === "test") {
      setIsNickAvailable(false); // 이미 사용 중
    } else {
      setIsNickAvailable(true);  // 사용 가능
    }
  };

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCancel = () => onClose();

  const handleConfirm = () => {
    if (isNickAvailable) {
      // 사용 가능할 때만 닫기
      onClose();
    }
  };

  return (
    <>
      <GlobalFonts />
      <Wrap>
        <Card>
          <Inner style={{ ["--form-w"]: "17.25rem" }}>
            <Mascot src={mascot} alt="연필조아용" />

            <FormArea>
              <IdRow>
                <IdInput
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <CheckButton type="button" onClick={checkNickAvailability}>
                  중복<br />확인
                </CheckButton>
              </IdRow>

              {isNickAvailable !== null && (
                <Helper style={{ color: isNickAvailable ? "#00CA98" : "#FF5656" }}>
                  {isNickAvailable
                    ? "사용 가능한 닉네임입니다!"
                    : "이미 사용 중입니다!"}
                </Helper>
              )}
            </FormArea>

            <Buttons>
              <Button data-variant="cancel" onClick={handleCancel}>취소</Button>
              <Button
                data-variant="confirm"
                onClick={handleConfirm}
                disabled={isNickAvailable === false || isNickAvailable === null}
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
const Wrap = styled.div`
  width: 18.75rem;
  margin: 6.875rem auto 0;
  overflow: visible;
`;

const Card = styled.div`
  position: relative;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
`;

const Inner = styled.div`
  --form-w: 17.25rem;
  --gap: 0.3125rem;
  --btn-w: 3.125rem;
  --btn-h: 3rem;
  --input-h: 3rem;
  --pad-x: 1rem;

  width: 18.75rem;
  padding-top: 3.5rem;
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

const IdRow = styled.div`
  width: var(--form-w);
  display: flex;
  align-items: center;
  gap: var(--gap);
`;

const BaseInput = styled.input`
  height: var(--input-h);
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F;
  border-radius: 0.625rem;
  font-size: 1rem;
  padding-left: var(--pad-x);
  outline: none;
  font-family: "TJJoyofsingingM", sans-serif;

  &::placeholder { font-family: "TJJoyofsingingM", sans-serif; }
`;

const IdInput = styled(BaseInput)`
  width: calc(var(--form-w) - var(--btn-w) - var(--gap));
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
  text-align: left;
  font-family: "TJJoyofsingingM", sans-serif;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

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

  &:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;