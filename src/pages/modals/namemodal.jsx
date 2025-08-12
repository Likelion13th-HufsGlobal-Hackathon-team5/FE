// src/pages/modals/namemodal.jsx
import React from "react";
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
  }
  @font-face {
    font-family: "TJJoyofsingingB";
    src: url(${JoyB}) format("truetype");
    font-weight: 700;
  }
`;

// ===== 닉네임 변경 모달 =====
export default function NameModal() {
  return (
    <>
      <GlobalFonts />
      <Wrap>
        <Card>
          <Mascot src={mascot} alt="연필조아용" />
          <FormArea>
            <Input placeholder="변경할 닉네임" />
          </FormArea>
          <Buttons>
            <Button data-variant="cancel">취소</Button>
            <Button data-variant="confirm">변경하기</Button>
          </Buttons>
        </Card>
      </Wrap>
    </>
  );
}

// ===== 카드 외부 컨테이너 (중앙 정렬, 상단 여유) =====
const Wrap = styled.div`
  width: 18.75rem; /* 300px */
  margin: 6.875rem auto 0; /* 110px */
  overflow: visible;
`;

// ===== 카드 본체 =====
const Card = styled.div`
  position: relative;
  width: 18.75rem; /* 300px */
  height: 11.25rem; /* 180px */
  background: #fff;
  border-radius: 1.25rem; /* 20px */
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.5rem; /* 56px */
`;

// ===== 마스코트 이미지 =====
const Mascot = styled.img`
  position: absolute;
  top: -2.8125rem; /* -45px */
  left: 50%;
  transform: translateX(-50%);
  width: 9.375rem; /* 150px */
  height: auto;
`;

// ===== 폼 영역 =====
const FormArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ===== 닉네임 입력 필드 =====
const Input = styled.input`
  width: 15rem; /* 240px */
  height: 2.5rem; /* 40px */
  padding: 0 0.75rem; /* 12px */
  border: 0.125rem solid #9aa0a6; /* 2px */
  border-radius: 0.625rem; /* 10px */
  font-family: "TJJoyofsingingM", sans-serif;
  font-weight: 500;
  font-size: 0.875rem; /* 14px */
  ::placeholder {
    color: #bdbdbd;
  }
  :focus {
    outline: none;
    border-color: #32885d;
  }
`;

// ===== 버튼 영역 =====
const Buttons = styled.div`
  display: flex;
  gap: 0.75rem; /* 12px */
  margin: 0.75rem 0 1rem; /* 12px 0 16px */
`;

// ===== 버튼 스타일 =====
const Button = styled.button`
  width: 7.5rem; /* 120px */
  height: 2.5rem; /* 40px */
  border: none;
  border-radius: 1.25rem; /* 20px */
  font-size: 0.875rem; /* 14px */
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
