import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom"; // 추가
import bgImage from "../assets/signup-bg.png";

/* === 폰트 파일 import === */
import DNFBitBit from "../fonts/DNFBitBitTTF.ttf";
import JoyM from "../fonts/TJJoyofsingingM_TTF.ttf";

/* === 전역 폰트 등록 === */
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
  const navigate = useNavigate(); // 추가

  const [nickname, setNickname] = useState("");
  const [isNickAvailable, setIsNickAvailable] = useState(null);

  const [id, setId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);

  // 닉네임 중복 확인
  const checkNickAvailability = () => {
    if (nickname === "testnick") {
      setIsNickAvailable(false);
    } else {
      setIsNickAvailable(true);
    }
  };

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

  // ✅ 모든 조건 충족 여부
  const isFormValid =
    nickname.trim().length > 0 &&
    id.trim().length > 0 &&
    password.length > 0 &&
    passwordConfirm.length > 0 &&
    isPasswordMatch === true &&
    isNickAvailable === true &&   // 반드시 중복확인 통과(클릭)해야 true
    isIdAvailable === true;       // 반드시 중복확인 통과(클릭)해야 true

  // ✅ 가입하기 클릭
  const handleSignUp = () => {
    if (!isFormValid) return;     // 조건 미충족이면 아무 반응 없음
    navigate("/main");
               // 메인 라우트에 맞게 경로 필요 시 수정
  };

  return (
    <Container>
      <FontStyles />
      <Title>회원가입</Title>
      <Form>
        {/* 닉네임 */}
        <div>
          <IdRow>
            <IdInput
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNickAvailable(null); // 입력 변경 시 재검증 요구
              }}
            />
            <CheckButton onClick={checkNickAvailability}>
              중복<br />확인
            </CheckButton>
          </IdRow>
          {isNickAvailable !== null && (
            <Helper style={{ color: isNickAvailable ? "#00CA98" : "#FF5656" }}>
              {isNickAvailable ? "사용 가능한 닉네임입니다!" : "이미 사용 중입니다!"}
            </Helper>
          )}
        </div>

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
              onChange={(e) => {
                setId(e.target.value);
                setIsIdAvailable(null); // 입력 변경 시 재검증 요구
              }}
            />
            <CheckButton onClick={checkIdAvailability}>
              중복<br />확인
            </CheckButton>
          </IdRow>
          {isIdAvailable !== null && (
            <Helper style={{ color: isIdAvailable ? "#00CA98" : "#FF5656" }}>
              {isIdAvailable ? "사용 가능한 아이디입니다!" : "이미 사용 중입니다!"}
            </Helper>
          )}
        </div>

        {/* 비밀번호 */}
        <InputBox
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsPasswordMatch(e.target.value.length > 0 && e.target.value === passwordConfirm);
          }}
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
            <Helper style={{ color: isPasswordMatch ? "#00CA98" : "#FF5656" }}>
              {isPasswordMatch ? "비밀번호가 일치합니다!" : "비밀번호가 일치하지 않습니다!"}
            </Helper>
          )}
        </div>

        {/* 가입하기 버튼 */}
        <SignUpButton
          type="button"
          onClick={handleSignUp}
          disabled={!isFormValid}   // 조건 미충족 시 비활성화(아무 반응 없음)
        >
          가입하기
        </SignUpButton>
      </Form>
    </Container>
  );
}

/* ===== styled-components ===== */
const Container = styled.div`
  width: 24.5625rem;
  height: 53.25rem;
  background: url(${bgImage}) no-repeat center center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.25rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #4CAF50;
  margin-top: 3.75rem;
  font-family: 'JoyM', sans-serif;
`;

const Form = styled.div`
  width: 17.25rem;
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.875rem;
`;

const InputBox = styled.input`
  width: 17.25rem;
  height: 3rem;
  box-sizing: border-box;
  border: 0.125rem solid #8F8F8F;
  border-radius: 0.625rem;
  font-size: 1rem;
  padding-left: 1rem;
  outline: none;
  font-family: 'JoyM', sans-serif;

  &::placeholder {
    font-family: 'JoyM', sans-serif;
  }
`;

const Helper = styled.p`
  margin: 0;
  padding-top: 0.625rem;
  font-size: 1rem;
  text-align: left;
  font-family: 'JoyM', sans-serif;
`;

const IdRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

const IdInput = styled(InputBox)`
  width: 13.8125rem;
  flex: none;
`;

const CheckButton = styled.button`
  width: 3.125rem;
  height: 3rem;
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
  font-family: 'JoyM', sans-serif;
`;

const SignUpButton = styled.button`
  width: 13.5625rem;
  height: 3.625rem;
  background-color: #66CE94;
  color: #fff;
  font-size: 2rem;
  border: none;
  border-radius: 6.25rem;
  cursor: pointer;
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DNFBitBitTTF', sans-serif;
  box-shadow: 0.125rem 0.25rem 0.4375rem rgba(0, 0, 0, 0.3);

  /* 비활성화 시 "아무 반응 없음" 유지 */
  &:disabled {
    pointer-events: none;  /* 클릭해도 반응 없음 */
    /* 필요하면 시각적 변화 제거: opacity 유지 */
    opacity: 1;
  }
`;