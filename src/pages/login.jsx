import axios from "axios";
import { useState } from "react";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

/* === Assets === */
import bgImage from "../assets/signup-bg.png";
import yong from "../assets/login-yong.png";
import cloud from "../assets/구름.png";
import miniCloud from "../assets/미니구름.png";
import titleImg from "../assets/요기용in.svg";

/* === Fonts === */
import JoyB from "../fonts/TJJoyofsingingB_TTF.ttf"; // Bold
import JoyM from "../fonts/TJJoyofsingingM_TTF.ttf"; // Medium

/* === Global Fonts === */
const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'JoyB';
    src: url(${JoyB}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'JoyM';
    src: url(${JoyM}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;

export default function Login() {
  const nav = useNavigate();
  const [Id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


const handleLogin = async () => {
  setLoading(true); // 로딩 시작
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      userId: Id,
      password: password,
    });

    const token = response.data.accessToken;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userId", Id);

    console.log("로그인 성공:", token);
    console.log(response.data);

    // hasAiKeywordHistory 값 확인 후 이동
    if (response.data.hasAiKeywordHistory) {
      nav("/main");       // true면 main으로 이동
    } else {
      nav("/keyword");    // false면 keyword로 이동
    }

  } catch (error) {
    console.error("로그인 실패:", error.response?.data || error.message);
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  } finally {
    setLoading(false); // 로딩 종료
  }
};


const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (!loading) handleLogin();
  }
};




  return (
    <Stage>
      <Container>
        <FontStyles />

        {/* 타이틀 */}
        <Title src={titleImg} alt="요기용in" />

        {/* 입력 */}
        <Form>
          <InputBox
            placeholder="아이디를 입력해 주세요."
            value={Id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Form>

        <Buttons>
          <LoginBtn type="button" onClick={handleLogin}>
            로그인
          </LoginBtn>
          <SignupBtn type="button" onClick={() => nav("/signin")}>
            회원가입
          </SignupBtn>
        </Buttons>

        {/* 데코 */}
        <Cloud src={cloud} alt="구름" />
        <MiniCloud src={miniCloud} alt="미니 구름" />

        {/* 말풍선 */}
        <SpeechBubble>{`용인 축제\n알려 줄게용!`}</SpeechBubble>

        {/* 캐릭터 */}
        <Yong src={yong} alt="용" />
      </Container>
    </Stage>
  );
}

/* ===================== styled-components ===================== */

const Stage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  width: 24.5625rem;   /* 393px */
  height: 53.25rem;    /* 852px */
  background: url(${bgImage}) no-repeat center center;
  background-size: contain;
  padding: 2.5rem 1.25rem; /* 40px 20px */
  overflow: hidden;
`;

const Title = styled.img`
  position: absolute;
  top: 7.5rem; /* 120px */
  left: 50%;
  transform: translateX(-50%);
  width: 18rem; /* 288px */
  height: auto;
  z-index: 3;
  pointer-events: none;
`;

const Form = styled.div`
  position: relative;
  z-index: 3;
  margin-top: 15rem; /* 240px */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem; /* 20px */
`;

const InputBox = styled.input`
  width: 19rem;
  height: 3.5rem;
  border: 0.125rem solid #8f8f8f; /* 2px */
  border-radius: 0.625rem; /* 10px */
  font-size: 1.125rem; /* 18px */
  padding-left: 1rem;   /* 16px */
  outline: none;
  font-family: 'JoyM', sans-serif;

  &::placeholder {
    font-family: 'JoyM', sans-serif;
  }
`;

const Buttons = styled.div`
  position: relative;
  z-index: 3;
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9375rem; /* 15px */
`;

const baseBtn = `
  width: 8.125rem;   /* 130px */
  height: 3.25rem;
  border-radius: 6.25rem; /* 100px */
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JoyB', sans-serif;
  font-size: 1.125rem; /* 18px */
  box-shadow: 0.125rem 0.125rem 0 rgba(0,0,0,0.5);
`;

const LoginBtn = styled.button`
  ${baseBtn}
  color: #fff;
  border-radius: 6.25rem;
  background: #66CE94;
  box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.25);
`;

const SignupBtn = styled.button`
  ${baseBtn}
  background: #fcfaf0;
  color: #000;
  box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.25);
`;

const Cloud = styled.img`
  position: absolute;
  left: -1rem;   /* -16px */
  bottom: 0;
  width: 30rem;  /* 480px */
  z-index: 1;
`;

const MiniCloud = styled.img`
  position: absolute;
  right: 0.5rem; /* 8px */
  bottom: 0;
  width: 13rem;  /* 208px */
  z-index: 1;
`;

const SpeechBubble = styled.div`
  position: absolute;
  right: 1.2rem;
  bottom: 12rem;
  background: #00c674;
  color: #fff;
  padding: 1rem 1.75rem;
  border-radius: 100rem;
  font-family: 'JoyM', sans-serif;
  font-size: 1rem;
  line-height: 1.4;
  z-index: 3;
  white-space: pre-line;
  transform: rotate(12deg);

  &::after {
    content: '';
    position: absolute;
    bottom: -0.2rem;  /* 바깥으로 빼기 */
    left: 6%;        /* 중앙 */
    transform: translateX(-50%);
    border-width: 0.6rem 0.6rem 0 0.6rem; 
    border-style: solid;
    border-color: #00c674 transparent transparent transparent;
    transform: rotate(29deg);
  }
`;

const Yong = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  z-index: 2;
`;
