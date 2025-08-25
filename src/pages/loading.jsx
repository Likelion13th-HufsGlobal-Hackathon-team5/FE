// src/pages/loading.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"; // 🔹 useLocation 추가
import axiosInstance from "../AxiosInstance";                // 🔹 실제 호출 추가

// ===== 이미지 불러오기 =====
import bgImage from "../assets/signup-bg.png";
import parkImage from "../assets/공원조아용.png";

// ===== 로딩 페이지 컴포넌트 =====
export default function LoadingPage() {
  const navigate = useNavigate();
  const { state } = useLocation(); // 🔹 키워드 페이지에서 넘어온 state 받기

  useEffect(() => {
    // 🔹 실제 연동 로직: 키워드 저장 → (선택) 추천 호출 → 다음 페이지로 이동
    const run = async () => {
      try {
        const ids = state?.selectedIds || [];
        const next = state?.next || "/airecommend";

        // 1) 선택 키워드 저장
        await axiosInstance.put("/me/selected-keywords", { keywordIds: ids });

        // 2) (선택) 추천 미리 불러오고 싶으면 주석 해제
        // const recs = await axiosInstance.get("/ai/recommendations", { params: { keywordIds: ids } });

        // 3) 완료 후 다음 페이지로
        navigate(next, {
          // 필요하면 추천 결과도 함께 전달
          // state: { selectedIds: ids, recs: recs.data },
          state: { selectedIds: ids },
          replace: true,
        });
      } catch (e) {
        console.error("로딩 중 오류:", e);
        alert("서버 오류가 발생했습니다.");
        navigate(-1);
      }
    };
    run();
  }, [navigate, state]);

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

/* ===== styled-components (기존 그대로) ===== */

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

const CenterImage = styled.img`
  max-width: 80%;
  height: auto;
  margin-bottom: 4rem; /* 64px */
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem; /* 32px */
`;

const FestivalText = styled.p`
  margin: 0;
  line-height: 1.1;
  color: #66ce94;
  font-size: 1.875rem; /* 30px */
  font-family: "TJJoyofsingingB";
`;

const LoadingText = styled.p`
  margin: 0;
  line-height: 1.1;
  color: #32885d;
  font-size: 1.875rem; /* 30px */
  font-family: "TJJoyofsingingB";
`;
