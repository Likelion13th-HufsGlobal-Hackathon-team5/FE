
import React from "react";
import bgImage from "../assets/signup-bg.png";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AiRecommendation() {
  const cards = [
    {
      title: "힐링할 수 있는 축제",
      subtitle: "모험을 풍선 축제 등 3개",
      name: "풍선 축제",
      date: "2025.07.30 ~ 08.20",
    },
    {
      title: "혼자서도 즐길 수 있는 축제",
      subtitle: "모험을 풍선 축제 등 3개",
      name: "풍선 축제",
      date: "2025.07.30 ~ 08.20",
    },
    {
      title: "조용히 즐길 수 있는 축제",
      subtitle: "모험을 풍선 축제 등 3개",
      name: "풍선 축제",
      date: "2025.07.30 ~ 08.20",
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.1, 
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 768, 
        settings: { slidesToShow: 1.2 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2.5 }
      }
    ]
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
              {[1, 2, 3].map((n) => (
                <ImageBox key={n}>
                  <ImagePlaceholder />
                </ImageBox>
              ))}
            </Slider>
          </ImageSlider>
          <CardFooter>
            <FestivalName>{card.name}</FestivalName>
            <Date>{card.date}</Date>
          </CardFooter>
        </Card>
      ))}
      </CardContainer>
    </Container>
  );
}

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
  font-family: "DNFBitBit";
  align-items: center;
  padding: 0.38rem 2.38rem 0.38rem 2.38rem;
  border-radius: 0 2.5rem 2.5rem 0;
  background: #66CE94;
  color: #FFFF;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding : 0rem 0.63rem 1.25rem 0.63rem;
  height: calc(100vh - 2rem); 


::-webkit-scrollbar {
  display: none;
}
  ::-webkit-scrollbar-thumb {
    display: none;
  }
`


const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  height : 16.44rem;
  padding: 0.8rem;
  margin-top: 1rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0,0,0,0.1);

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h3`
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-family: "TJJoyofsingingB";
  margin: 0;
`;

const Subtitle = styled.p`
  color: #3F3F3F;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-family: "TJJoyofsingingB";
  margin: 0.2rem 0 0.6rem 0;
`;

const ImageSlider = styled.div`
  margin-bottom: 0.5rem;

  .slick-list {
    height: auto !important;
  }

  .slick-slide {
    padding-right: 0.5rem;
  }
`;


const ImageBox = styled.div`
  height: clamp(10px, 10vw, 140px);
`;

const ImagePlaceholder = styled.div`
  background: skyblue;
  height: 100%;
  border-radius: 0.8rem;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const FestivalName = styled.span`
  font-weight: bold;
  font-size: clamp(0.85rem, 1.8vw, 1rem);
`;

const Date = styled.span`
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  color: #888;
`;
