// src/pages/loading.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 🔹 페이지 이동을 위한 훅

// ===== 이미지 불러오기 =====
import bgImage from "../assets/signup-bg.png";
import parkImage from "../assets/공원조아용.png";

// ===== 로딩 페이지 컴포넌트 =====
export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // ---------------------------
    // [목데이터 부분]
    // 지금은 서버가 없으니까,
    // 3초 기다린 뒤 메인(/main) 페이지로 이동
    // ---------------------------
    const timer = setTimeout(() => {
      navigate("/main"); // 원하는 경로로 교체 가능
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // ---------------------------
  // [실제 연동으로 교체할 부분]
  // const res = await api.get("/bootstrap");
  // if(res.data.ok) { navigate("/main"); }
  // else { navigate("/error"); }
  // ---------------------------

  return (
    <Container>
      {/* 중앙 이미지 */}
      <CenterImage src={parkImage} alt="공원조아용" />

      {/* 텍스트 그룹 */}
      <TextGroup>
        <FestivalText>축제를 불러오는 중이야~</FestivalText>
        <LoadingText>Loading....</LoadingText>
      </TextGroup>
    </Container>
  );
}

/* ===== styled-components ===== */

/* 전체 페이지 컨테이너 */
const Container = styled.div`
  width: 24.5625rem; /* 393px */
  height: 53.25rem; /* 852px */
  background: url(${bgImage}) no-repeat center center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.25rem; /* 40px 20px */
  margin: 0 auto;
`;

/* 중앙 이미지 */
const CenterImage = styled.img`
  max-width: 80%;
  height: auto;
  margin-bottom: 4rem; /* 64px */
`;

/* 텍스트 묶음 */
const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; /* 32px */
`;

/* 첫 번째 텍스트 */
const FestivalText = styled.p`
  margin: 0;
  line-height: 1.1;
  color: #66ce94;
  font-size: 1.875rem; /* 30px */
  font-family: "TJJoyofsingingB";
`;

/* 두 번째 텍스트 */
const LoadingText = styled.p`
  margin: 0;
  line-height: 1.1;
  color: #32885d;
  font-size: 1.875rem; /* 30px */
  font-family: "TJJoyofsingingB";
`;
