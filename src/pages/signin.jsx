import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import bgImage from "../assets/signup-bg.png";

// 폰트 파일 import
import DNFBitBit from "../fonts/DNFBitBitTTF.ttf";
import JoyM from "../fonts/TJJoyofsingingM_TTF.ttf";

// 전역 폰트 등록
const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'DNFBitBitTTF';
    src: url(${DNFBitBit}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'JoyM';
    src: url(${JoyM}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export default function Signin() {
  const [id, setId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);

  // 아이디 중복 확인
  const checkIdAvailability = () => {
    if (id === "test") {
      setIsIdAvailable(false);
    } else {
      setIsIdAvailable(true);
    }
  };

  // 비밀번호 확인
  const handlePasswordConfirm = (value) => {
    setPasswordConfirm(value);
    setIsPasswordMatch(value === password && value.length > 0);
  };

  return (
    <Container>
      <FontStyles />

      <Title>회원가입</Title>

      <Form>
        {/* 닉네임 */}
        <InputBox placeholder="닉네임" />

        {/* 출생연도 */}
        <div>
          <InputBox placeholder="출생연도" inputMode="numeric" maxLength={4} />
          <Helper>예) 2004</Helper>
        </div>

        {/* 아이디 */}
        <div>
          <IdRow>
            <IdInput
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <CheckButton onClick={checkIdAvailability}>
              중복<br />확인
            </CheckButton>
          </IdRow>
          {isIdAvailable !== null && (
            <Helper
              style={{
                color: isIdAvailable ? "#00CA98" : "#FF5656",
              }}
            >
              {isIdAvailable
                ? "사용 가능한 아이디입니다!"
                : "이미 사용 중입니다!"}
            </Helper>
          )}
        </div>

        {/* 비밀번호 */}
        <InputBox
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 비밀번호 확인 */}
        <div>
          <InputBox
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => handlePasswordConfirm(e.target.value)}
          />
          {isPasswordMatch !== null && (
            <Helper
              style={{
                color: isPasswordMatch ? "#00CA98" : "#FF5656",
              }}
            >
              {isPasswordMatch
                ? "비밀번호가 일치합니다!"
                : "비밀번호가 일치하지 않습니다!"}
            </Helper>
          )}
        </div>

        {/* 가입하기 버튼 */}
        <SignUpButton>가입하기</SignUpButton>
      </Form>
    </Container>
  );
}

/* ===== styled-components ===== */

const Container = styled.div`
  width: 24.5625rem; /* 393px */
  height: 53.25rem; /* 852px */
  background: url(${bgImage}) no-repeat center center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.25rem; /* 40px 20px */
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem; /* 48px */
  color: #4CAF50;
  margin-top: 3.75rem; /* 60px */
  font-family: 'JoyM', sans-serif;
`;

const Form = styled.div`
  width: 17.25rem; /* 276px */
  margin-top: 1.875rem; /* 30px */
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.875rem; /* 30px */
`;

const InputBox = styled.input`
  width: 17.25rem; /* 276px */
  height: 3rem; /* 48px */
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F; /* 2px */
  border-radius: 0.625rem; /* 10px */
  font-size: 1rem; /* 16px */
  padding-left: 1rem; /* 16px */
  outline: none;
  font-family: 'JoyM', sans-serif;

  &::placeholder {
    font-family: 'JoyM', sans-serif;
  }
`;

const Helper = styled.p`
  margin: 0;
  padding-top: 0.625rem; /* 10px */
  font-size: 1rem; /* 16px */
  text-align: left;
  font-family: 'JoyM', sans-serif;
`;

const IdRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem; /* 5px */
`;

const IdInput = styled(InputBox)`
  width: 13.8125rem; /* 221px */
  flex: none;
`;

const CheckButton = styled.button`
  width: 3.125rem; /* 50px */
  height: 3rem; /* 48px */
  background-color: #32885D;
  color: #fff;
  font-size: 0.8125rem; /* 13px */
  border: none;
  border-radius: 0.625rem; /* 10px */
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  text-align: center;
  font-family: 'JoyM', sans-serif;
`;

const SignUpButton = styled.button`
  width: 13.5625rem; /* 217px */
  height: 3.625rem; /* 58px */
  background-color: #66CE94;
  color: #fff;
  font-size: 2rem; /* 32px */
  border: none;
  border-radius: 6.25rem; /* 100px */
  cursor: pointer;
  margin-top: 1.875rem; /* 30px */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DNFBitBitTTF', sans-serif;
  box-shadow: 0.125rem 0.25rem 0.4375rem rgba(0, 0, 0, 0.3); /* 2px 4px 7px */
`;
