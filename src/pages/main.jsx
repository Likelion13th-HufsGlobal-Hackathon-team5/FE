import styled from "styled-components"
import bgImage from "../assets/signup-bg.png";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaStar } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 24.5625rem;
  height: 49.25rem;  
  padding: 2.94rem 0rem 0rem 0rem;
  background: #f7f7f7;
  font-family: sans-serif;
  background: url(${bgImage}) no-repeat center center;
  background-size: contain;
  margin: 0 auto;
`;

const Header = styled.h2`
    display: flex;
    width: 10.25rem;
    padding: 0.375rem 1.97rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    border-radius: 0 2.5rem 2.5rem 0;
    background: #66CE94;
    color: #FFF;
    font-family: "DNFBitBit";
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 0.26rem;
`;

const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .react-calendar {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 1rem;
    width: 21.6875rem;
    justify-content: center;
  }

  /* 날짜 칸 기본 스타일 */
  .react-calendar__tile {
    width: 2.7rem;       
    height: 2.8rem;       
    font-size: 1.1rem; 
    text-align: center;
    border-radius: 50%;
  }

  /* 선택된 날짜 */
  .selected-day {
    background-color: #32885D !important; /* 진한 초록 */
    color: white !important;
    border-radius: 50%;
  }

  /* 데이터가 있는 날짜 */
  .data-day {
    background-color: #FFE58F !important; /* 노란색 */
    border-radius: 50%;
  }

  /* hover 효과 */
  .react-calendar__tile:enabled:hover {
    background-color: #d9f2e5;
  }

  .react-calendar__tile abbr {
    display: none;
  }

  .react-calendar__tile:disabled {
  visibility: hidden;
}

  /* 클릭 시 배경색 제거 */
  .react-calendar__navigation button:active {
    background-color: transparent !important;
    box-shadow: none !important;
  }

  /* 포커스 제거 */
  .react-calendar__navigation button:focus {
    outline: none !important;
    background-color: transparent !important;
  }

  /* 모바일 사파리/크롬 터치 하이라이트 제거 */
  .react-calendar__navigation button {
    -webkit-tap-highlight-color: transparent;
  }

  .react-calendar__navigation button:hover {
  background-color: transparent !important;
  box-shadow: none !important;
}

  .react-calendar__navigation button {
    font-size: 1rem;
    background: none;
    border: none;
    font-family: "TJJoyofsingingB";
    cursor: pointer;
  }

`;



const HeaderContainer = styled.div`
    display: flex;
    justify-content: right;
    margin-top: 1.88rem;
`

const HeaderTwo = styled.div`
    display: flex;
    width: auto;
    padding: 0.375rem 2.38rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 2.5rem 0 0 2.5rem;
    background: #FCFAF0;
    color: #66CE94;
    font-family: "DNFBitBit";
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 0.26rem;
`

const ListContainer = styled.div`
  height: 19rem; /* 충분히 크게 */
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.94rem 1.44rem 0 1.44rem;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListBox = styled.div`
    display: flex;
    flex-direction: column;
    width : 21.69rem;
    height: 7.375rem;
    padding: 0 0.625rem 0.625rem 0.625rem;
    box-sizing: border-box;
    background-color: #7b7b7b;
    flex-shrink: 0;
    border-radius: 1.25rem;
    border: 2px solid #E5E5E5;
`

const ListFooter = styled.div`
    display : flex;
    flex-direction: column;
    margin-top : 1.56rem;
`

const StarContainer = styled.div`
    display : flex;
    justify-content: center;
    width: 1.9375rem;
    height: 3.1875rem;
    fill: rgba(255, 255, 255, 0.50);
    border-radius: 0 0 0.5rem 0.5rem;
    background-color: red;
    margin-left : 0.435rem;
`

const Title = styled.h3`
  color : #FFFF;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-family: "TJJoyofsingingB";
  margin: 0;
`;

const Subtitle = styled.p`
  color: #FFFF;
  margin : 0;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-family: "TJJoyofsingingB";
`;

const Star = styled(FaStar)`
  margin-top: 1rem;
  width: 19px;
  height: 19px;
  border-radius: 0.1rem;
  fill: ${({ $active }) => ($active ? "#FFEB34" : "rgba(255,255,255,0.5)")};
`;
export default function Main(){

    const [value, setValue] = useState(new Date(2025, 0, 1));

     const festivals = [
    { name: "풍선 축제", period: "2025.07.30 ~ 08.20" },
    { name: "바다 축제", period: "2025.08.05 ~ 08.15" },
    { name: "불꽃 축제", period: "2025.09.01 ~ 09.05" },
    { name: "가을 단풍 축제", period: "2025.10.10 ~ 10.20" }
  ];

       const listfestivals = [
    { name: "리스트 풍선 축제", period: "2025.07.30 ~ 08.20" },
    { name: "리스트 바다 축제", period: "2025.08.05 ~ 08.15" },
    { name: "리스트 불꽃 축제", period: "2025.09.01 ~ 09.05" },
    { name: "리스트 가을 단풍 축제", period: "2025.10.10 ~ 10.20" }
  ];

      const [activeStars, setActiveStars] = useState(
    new Array(festivals.length).fill(false) // 처음엔 모두 비활성
  );
  // 데이터가 있는 날짜 목록
  const dataDates = [
    new Date(2025, 0, 30), // 1월 30일
    new Date(2025, 0, 31)  // 1월 31일36
  ];

  const isDataDate = dataDates.some(d => d.toDateString() === value.toDateString());

  // tileClassName → 날짜별로 클래스 부여
  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      // 선택된 날짜
      if (value && date.toDateString() === value.toDateString()) {
        return "selected-day";
      }
      // 데이터 있는 날짜
      if (dataDates.some(d => d.toDateString() === date.toDateString())) {
        return "data-day";
      }
    }
    return null;
  };

    const toggleStar = (idx) => {
    const newStars = [...activeStars];
    newStars[idx] = !newStars[idx]; // 클릭 시 반전
    setActiveStars(newStars);
  };


    return(
        <Container>
            <Header>축제 달력</Header>
            <CalendarWrap>
                <Calendar
                onChange={setValue}
                value={value}
                tileClassName={getTileClassName}
                tileContent={({ date, view }) =>
                    view === "month" ? (
                    <div style={{ fontSize: "1rem", fontWeight: 500 }}>
                        {date.getDate()} {/* 앞자리 0 없이 날짜 */}
                    </div>
                    ) : null
                }
                />
            </CalendarWrap>
            <HeaderContainer>
                <HeaderTwo>{isDataDate ? "축제 리스트" : "인기 축제"}</HeaderTwo>
            </HeaderContainer>
            <ListContainer>
            {isDataDate
                ? listfestivals.map((fest, idx) => (
                    <ListBox key={idx}>
                    <StarContainer onClick={() => toggleStar(idx)}>
                        <Star $active={activeStars[idx]} onClick={() => toggleStar(idx)} />
                    </StarContainer>
                    <ListFooter>
                        <Title className="festival-name">{fest.name}</Title>
                        <Subtitle className="festival-period">{fest.period}</Subtitle>
                    </ListFooter>
                    </ListBox>
                ))
                : festivals.map((fest, idx) => (
                    <ListBox key={idx}>
                    <StarContainer onClick={() => toggleStar(idx)}>
                        <Star $active={activeStars[idx]} onClick={() => toggleStar(idx)} />
                    </StarContainer>
                    <ListFooter>
                        <Title className="festival-name">{fest.name}</Title>
                        <Subtitle className="festival-period">{fest.period}</Subtitle>
                    </ListFooter>
                    </ListBox>
                ))}
            </ListContainer>
        </Container>
    )
}