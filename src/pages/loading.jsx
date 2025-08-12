// src/pages/loading.jsx
import React from "react";
import styled from "styled-components";

// ===== 이미지 불러오기 =====
import bgImage from "../assets/signup-bg.png";
import parkImage from "../assets/공원조아용.png";

// ===== 로딩 페이지 컴포넌트 =====
export default function LoadingPage() {
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
