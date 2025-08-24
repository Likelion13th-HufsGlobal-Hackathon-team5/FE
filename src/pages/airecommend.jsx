// src/pages/airecommend.jsx
import React, { useEffect, useMemo, useState } from "react";
import bgImage from "../assets/signup-bg.png";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../AxiosInstance";

// 이미지가 /images/... 식으로 오면 API ORIGIN을 붙여서 절대경로로
const API_ORIGIN = (() => {
  try { return new URL(process.env.REACT_APP_API_URL).origin; } catch { return ""; }
})();
const toAbs = (p) => (p && !p.startsWith("http") ? `${API_ORIGIN}${p}` : p);

export default function AiRecommendation() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/festivals/recommend", {
          params: { limit: 5 }, // 필요 없으면 제거 가능
        });
        const data = res?.data;
        if (data?.success && Array.isArray(data?.data?.items)) {
          setItems(data.data.items);
          // 개발 중 확인용 로그 (원하면 삭제)
          console.log("[AI RECO] items:", data.data.items);
        } else {
          setItems([]);
        }
      } catch (e) {
        // 조용히 실패 (디자인 영향 없음)
        console.warn("[AI RECO ERROR]", e?.response?.status, e?.response?.data || e?.message);
        setItems([]);
      }
    })();
  }, []);

  // 원본 디자인 유지: 카드 3개 + 각 카드의 슬라이드
  // 받은 items를 3그룹으로 분배(부족하면 순환 채움, 완전 비면 placeholder 그대로 보임)
  const grouped = useMemo(() => {
    const safe = Array.isArray(items) ? items : [];
    const fill = (len) => {
      if (safe.length === 0) return [];
      const out = [];
      for (let i = 0; i < len; i++) out.push(safe[i % safe.length]);
      return out;
    };
    const g0 = safe.filter((_, i) => i % 3 === 0);
    const g1 = safe.filter((_, i) => i % 3 === 1);
    const g2 = safe.filter((_, i) => i % 3 === 2);
    return [g0.length ? g0 : fill(3), g1.length ? g1 : fill(3), g2.length ? g2 : fill(3)];
  }, [items]);

  const cards = useMemo(
    () => [
      {
        title: "힐링할 수 있는 축제",
        subtitle:
          items.length > 0
            ? `${items[0].festivalName} 등 ${items.length}개`
            : "모현읍 풍선 축제 등 3개",
        list: grouped[0],
      },
      {
        title: "혼자서도 즐길 수 있는 축제",
        subtitle:
          items.length > 1
            ? `${(items[1] || items[0])?.festivalName} 등 ${items.length}개`
            : "모현읍 풍선 축제 등 3개",
        list: grouped[1],
      },
      {
        title: "조용히 즐길 수 있는 축제",
        subtitle:
          items.length > 2
            ? `${(items[2] || items[0])?.festivalName} 등 ${items.length}개`
            : "모현읍 풍선 축제 등 3개",
        list: grouped[2],
      },
    ],
    [grouped, items]
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1.2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
    ],
  };

  return (
    <Container>
      <Header>AI 추천</Header>

      <CardContainer>
        {cards.map((card, idx) => (
          <Card key={idx}>
            <Title>{card.title}</Title>
            <Subtitle>{card.subtitle}</Subtitle>
            <ImageSlider>
              <Slider {...sliderSettings}>
                {card.list.length > 0
                  ? card.list.map((it, n) => (
                    <ImageBox key={`${it.festivalId}-${n}`}>
                      <ImagePlaceholder
                        style={
                          it?.imagePath
                            ? {
                              backgroundImage: `url(${toAbs(it.imagePath)})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                            : undefined
                        }
                      >
                        <InfoContianer>
                          <FestivalName>{it?.festivalName ?? "풍선 축제"}</FestivalName>
                          <Date>
                            {(it?.festivalStart || "2025.07.30")} ~ {(it?.festivalEnd || "08.20")}
                          </Date>
                        </InfoContianer>
                      </ImagePlaceholder>
                    </ImageBox>
                  ))
                  : [1, 2, 3].map((n) => (
                    <ImageBox key={n}>
                      <ImagePlaceholder>
                        <InfoContianer>
                          <FestivalName>풍선 축제</FestivalName>
                          <Date>2025.07.30 ~ 08.20</Date>
                        </InfoContianer>
                      </ImagePlaceholder>
                    </ImageBox>
                  ))}
              </Slider>
            </ImageSlider>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
}

/* ===== 원본 스타일 그대로 ===== */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 24.5625rem;
  height: 49.25rem;  
  padding: 2.94rem 0rem 1rem 0rem;
  background: #f7f7f7;
  font-family: sans-serif;
  background: url(${bgImage}) no-repeat center center;
  background-size: contain;
  margin: 0 auto;
  overflow-y: auto;
`;

const Header = styled.h2`
  display: flex;
  margin : 0;
  width: 10.25rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.38rem 2.38rem 0.38rem 2.38rem;
  border-radius: 0 2.5rem 2.5rem 0;
  background: #66CE94;
  color: #FFF;
  font-family: "DNF Bit Bit TTF";
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding : 0rem 0.63rem 1.25rem 0.63rem;
  flex: 1;

  ::-webkit-scrollbar { display: none; }
  ::-webkit-scrollbar-thumb { display: none; }
`;

const Card = styled.div`
  height : 16.44rem;
  padding: 0.8rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  border: 1.5px solid #A9A9A9;
  background: #FCFAF0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    padding:0.62rem;
    padding-bottom: 0;
  }
`;

const Title = styled.h3`
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-family: "TJ Joy of singing TTF";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #3F3F3F;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #3F3F3F;
  font-family: "TJ Joy of singing TTF";
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0.2rem 0 0.6rem 0;
`;

// const ImageSlider = styled.div`
//  margin-bottom: 0.5rem;

//   .slick-list { height: auto !important; }
//   .slick-slide { padding-right: 0.5rem; }
// `;

const ImageSlider = styled.div`
  margin-bottom: 0.5rem;
  .slick-list {
    overflow: hidden;
  }
  .slick-slide {
    padding: 0 5px; /* 슬라이드 사이의 간격을 만듭니다 */
  }
`;

const ImageBox = styled.div`
  height: clamp(10px, 10vw, 140px);
`;

const ImagePlaceholder = styled.div`
  height: 12.31rem;
  border-radius: 0.8rem;
  padding: 0.625rem;
  display: flex;
  box-sizing: border-box;
  align-items: end;
  border-radius: 1.25rem;
  border: 1.5px solid #A9A9A9;
  background: linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

const InfoContianer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FestivalName = styled.span`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-family: "TJJoyofsingingB";
`;

const Date = styled.span`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-family: "TJJoyofsingingL";
`;
