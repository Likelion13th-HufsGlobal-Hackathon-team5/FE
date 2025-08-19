import axios from "axios";
// src/pages/signin.jsx
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/signup-bg.png";

/* === 이미지 import (뒤로가기 아이콘) === */
import backIcon from "../assets/back.svg";

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

/* =========================================
 * ① 목데이터(가짜 API) — 개발용
 *    실제 연동 시 아래 함수들을 axios 호출로 교체
 * ========================================= */

// (목) 닉네임 중복확인: "testnick", "admin"은 사용 불가
async function checkNicknameMock(nickname) {
  await new Promise((r) => setTimeout(r, 350)); // 지연 흉내
  const banned = ["testnick", "admin"];
  const ok = !!nickname && !banned.includes(nickname.trim().toLowerCase());
  return { ok, message: ok ? "사용 가능한 닉네임입니다!" : "이미 사용 중입니다!" };
}

// (목) 아이디 중복확인: "test", "user1"은 사용 불가
async function checkIdMock(id) {
  await new Promise((r) => setTimeout(r, 350));
  const taken = ["test", "user1"];
  const ok = !!id && !taken.includes(id.trim().toLowerCase());
  return { ok, message: ok ? "사용 가능한 아이디입니다!" : "이미 사용 중입니다!" };
}

// (목) 회원가입: 기본 검증 + 성공 시 토큰 반환
async function signupMock({ nickname, id, password, birthyear }) {
  await new Promise((r) => setTimeout(r, 500));
  if (!nickname?.trim() || !id?.trim() || !password?.trim()) {
    return { ok: false, message: "모든 필드를 입력해 주세요." };
  }
  if (["testnick", "admin"].includes(nickname.toLowerCase())) {
    return { ok: false, message: "이미 사용 중인 닉네임입니다." };
  }
  if (["test", "user1"].includes(id.toLowerCase())) {
    return { ok: false, message: "이미 사용 중인 아이디입니다." };
  }
  // 비번 8자 조건 없음! (요청사항)
  return { ok: true, token: "MOCK_TOKEN_123", user: { id, nickname, birthyear } };
}

/* =========================================
 * ② 실제 연동 시 교체할 포인트 (참고)
 * -----------------------------------------
 * import { api } from "../lib/api";
 *
 * async function checkNickname(name) {
 *   const { data } = await api.get("/auth/check-nickname", { params: { name }});
 *   return { ok: data.ok && data.data.available, message: data.data.available ? "사용 가능한 닉네임입니다!" : "이미 사용 중입니다!" };
 * }
 *
 * async function checkUserId(id) {
 *   const { data } = await api.get("/auth/check-id", { params: { id }});
 *   return { ok: data.ok && data.data.available, message: data.data.available ? "사용 가능한 아이디입니다!" : "이미 사용 중입니다!" };
 * }
 *
 * async function signupReal({ nickname, id, password, birthyear }) {
 *   const { data } = await api.post("/auth/signup", { nickname, userId:id, password, birthyear });
 *   return { ok: data.ok, token: data.data?.token, user: data.data?.user, message: data.message };
 * }
 * ========================================= */

export default function Signin() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [isNickAvailable, setIsNickAvailable] = useState(null);
  const [nickLoading, setNickLoading] = useState(false);

  const [id, setId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [idLoading, setIdLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);

  const [birthyear, setBirthyear] = useState("");
  const [error, setError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // 토큰 반환값 //
  const [IdToken , setIdtoken] = useState("");
  const [NameToken , setNametoken] = useState("");
  

  // // ===== 닉네임 중복 확인(목) =====
  // const checkNickAvailability = async () => {
  //   setError("");
  //   setNickLoading(true);
  //   try {
  //     const res = await checkNicknameMock(nickname);
  //     // (실제) const res = await checkNickname(nickname);
  //     setIsNickAvailable(res.ok);
  //   } catch {
  //     setIsNickAvailable(false);
  //   } finally {
  //     setNickLoading(false);
  //   }
  // };

  // // ===== 아이디 중복 확인(목) =====
  // const checkIdAvailability = async () => {
  //   setError("");
  //   setIdLoading(true);
  //   try {
  //     const res = await checkIdMock(id);
  //     // (실제) const res = await checkUserId(id);
  //     setIsIdAvailable(res.ok);
  //   } catch {
  //     setIsIdAvailable(false);
  //   } finally {
  //     setIdLoading(false);
  //   }
  // };

  const mockdata = {
        userId : id,
        password : password,
        passwordConfirm : password,
        nickname : nickname,
        birthYear : birthyear,
        idCheckToken : IdToken,
        nickCheckToken : NameToken
      }

const handleCheckId = async () => {
  setIdLoading(true);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/id-check`, { userId: id });
    setIdtoken(response.data.data.token);
    setIsIdAvailable(true); 
    console.log(response.data);
  } catch (err) {
    console.error(err);
    setIsIdAvailable(false);
  } finally {
    setIdLoading(false);
  }
};

 const handleCheckName = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/nick-check`,  
      { nickname : nickname }
    );

    setIsNickAvailable(true);
    console.log(response.data);  
    setNametoken(response.data.data.token);
  } catch (err) {
    setIsNickAvailable(false);
    console.error(err);
    console.log(nickname);
    
  }
};

 const handleSignIn = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,  
      {
        userId : id,
        password : password,
        passwordConfirm : password,
        nickname : nickname,
        birthYear : birthyear,
        idCheckToken : IdToken,
        nickCheckToken : NameToken
      }
    );
    
    console.log(response.data);  
  } catch (err) {
    console.log(mockdata);
    console.error(err);
    
  }
};


  // 비밀번호 확인 (※ 8자 조건 제거: 길이 > 0 이고 일치하면 OK)
  const handlePasswordConfirm = (value) => {
    setPasswordConfirm(value);
    setIsPasswordMatch(value.length > 0 && value === password);
  };

  // ✅ 모든 조건 충족 여부 (8자 조건 없이!)
  const isFormValid =
    nickname.trim().length > 0 &&
    id.trim().length > 0 &&
    password.length > 0 &&
    passwordConfirm.length > 0 &&
    isPasswordMatch === true &&
    isNickAvailable === true &&
    isIdAvailable === true;

  // ✅ 가입하기 클릭
  // const handleSignUp = async () => {
  //   if (!isFormValid || signupLoading) return;
  //   setError("");
  //   setSignupLoading(true);
  //   try {
  //     const res = await signupMock({ nickname, id, password, birthyear });
  //     // (실제) const res = await signupReal({ nickname, id, password, birthyear });

  //     if (!res.ok) {
  //       setError(res.message || "회원가입에 실패했어요.");
  //       return;
  //     }
  //     if (res.token) localStorage.setItem("accessToken", res.token);
  //     navigate("/main");
  //   } catch {
  //     setError("회원가입 중 오류가 발생했어요.");
  //   } finally {
  //     setSignupLoading(false);
  //   }
  // };

  return (
    <Container>
      <FontStyles />

      {/* 🔙 뒤로가기 버튼 */}
      <BackButton onClick={() => navigate("/login")}>
        <img src={backIcon} alt="뒤로가기" />
      </BackButton>

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
                setIsNickAvailable(null);
              }}
            />
            <CheckButton onClick={handleCheckName}  disabled={nickLoading}>
              {nickLoading ? "확인중" : <>중복<br />확인</>}
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
          <InputBox
            placeholder="출생 연도"
            inputMode="numeric"
            maxLength={4}
            value={birthyear}
            onChange={(e) => setBirthyear(e.target.value.replace(/\D/g, ""))}
          />
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
                setIsIdAvailable(null);
              }}
            />
            <CheckButton type="button" onClick={handleCheckId} disabled={idLoading}>
              {idLoading ? "확인중" : <>중복<br />확인</>}
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
            setIsPasswordMatch(
              e.target.value.length > 0 && e.target.value === passwordConfirm
            );
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

        {/* 에러 메시지 */}
        {error && <Error>{error}</Error>}

        {/* 가입하기 버튼 */}
        <SignUpButton
          type="button"
          onClick={handleSignIn}
          // disabled={!isFormValid || signupLoading}
          aria-busy={signupLoading}
        >
          {signupLoading ? "가입 중..." : "가입하기"}
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
  gap: 1.875rem; /* 원래 디자인 그대로 */
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
  cursor: pointer;
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
  cursor: pointer;

  &:disabled {
    opacity: 1;
  }
`;

// 뒤로가기 버튼 스타일
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 5px;
  margin-top: -5px;

  img {
    width: 40px;
    height: 40px;
  }
`;

const Error = styled.p`
  width: 17.25rem;
  margin: 0.25rem 0 0;
  color: #ff5656;
  font-size: 0.9375rem;
  font-family: 'JoyM', sans-serif;
  text-align: left;
`;
