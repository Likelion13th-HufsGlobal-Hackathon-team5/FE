import styled from "styled-components"
import bgImage from "../assets/signup-bg.png";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as Ss } from "../assets/Star-stroke.svg"
import { ReactComponent as S } from "../assets/Star 4.svg"
import { ReactComponent as Wa } from "../assets/go.svg"

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
position: relative;
    display: flex;
    flex-direction: column;
    width : 21.69rem;
    height: 7.375rem;
    padding: 0.625rem 0.625rem 0 0.625rem;
    box-sizing: border-box;
    background-image: url(${({ bg }) => bg || ""});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex-shrink: 0;
    border-radius: 1.25rem;
    border: 2px solid #E5E5E5;
    justify-content: flex-end;
    background: 
    linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), 
    url(${props => props.bg || ""}) no-repeat center center / cover, 
    lightgray; 
`

const ListFooter = styled.div`
    display : flex;
    flex-direction: column;
    padding-bottom: 0.4rem;
    gap: 0.2rem;
`

const BookM = styled.div`
  width: 1.9375rem;
  height: 3.1875rem;
  position: absolute;
  left: 1.0625rem;
  fill: rgba(255, 255, 255, 0.50);
  backdrop-filter: blur(5px);
  top: 0rem;       
  z-index: 2;       
  border-width: 0.5px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.4);
  border-top: none;
  display: flex;    
  align-items: flex-end;
  padding-bottom: 6px;
  box-sizing: border-box;
  justify-content: center; 
  border-radius: 0 0 10px 10px;
`

const Title = styled.h3`
  color: #111;
font-family: "TJ Joy of singing TTF";
font-size: 0.9375rem;
font-style: normal;
font-weight: 500;
line-height: normal;
margin: 0;
`;

const Subtitle = styled.p`
  color: #111;
font-family: "TJ Joy of singing TTF";
font-size: 0.75rem;
font-style: normal;
font-weight: 300;
line-height: normal;
margin: 0;
`;

const Arrow = styled.div`
    position: absolute;
    top: 0.37rem;
    right: 0.37rem;
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
`;

export default function Main() {

  const [festivalList, setFestivalList] = useState([]);
  const [monthfestivalList, setMonthfestivalList] = useState([]);
  const [activeStars, setActiveStars] = useState({});
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [topdata, setTopdata] = useState([]);
  const [markData, setMarkData] = useState(null);



useEffect(() => {
  const fetchBookMarkData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/mypage/bookmarks");
      setMarkData(response.data.data);

      // 북마크 데이터 기반 activeStars 초기화
      const initialStars = {};
      response.data.data.items.forEach(item => {
        if (item.festival?.festivalId) {
          initialStars[item.festival.festivalId] = true;
        }
      });
      setActiveStars(initialStars);

      console.log(response.data);
    } catch (err) {
      console.error("북마크 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBookMarkData();
}, []);


    const deleteBookmark = async (festivalId) => {
  try {
    const response = await axiosInstance.delete(`/${festivalId}`);
    console.log("북마크 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("북마크 삭제 실패:", error.response?.data || error.message);
    throw error;
  }
};


  const handleCalendar = async (year, month, date) => {
    try {
      const response = await axiosInstance.get(`/calendar/by-date`, {
        params: { year: Number(year), month: Number(month), date: Number(date) }
      });

      console.log("캘린더 데이터 불러오기 성공:", response.data);

      // 데이터가 있을 경우 리스트 갱신
      if (response.data && response.data.length > 0) {
        setFestivalList(response.data);
      } else {
        setFestivalList([]); // 데이터 없으면 빈 배열
      }
    } catch (error) {
      console.error("오류:", error.response?.data || error.message);
      setFestivalList([]);
    }
  };




  const handleMonthCalendar = async (year, month) => {
    try {
      const response = await axiosInstance.get(`/calendar/by-month`, {
        params: { year, month },
      });
      // 여기서 data 배열로 state 업데이트
      setMonthfestivalList(response.data?.data || []);
    } catch (error) {
      console.error(error);
      setMonthfestivalList([]);
    }
  };

  const handleBookmark = async (festivalId) => {
    try {
      const response = await axiosInstance.post(`/bookmarks`, {
        festivalId: festivalId
      });

      console.log("북마크 등록 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("북마크 등록 실패:", error.response?.data || error.message);
      throw error;
    }
  };


  const isSameOrBetween = (date, startStr, endStr) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const dateStr = `${y}-${m}-${d}`;
    return dateStr >= startStr && dateStr <= endStr;
  };

  const getFestivalCountForDate = (date) => {
    return monthfestivalList.reduce(
      (count, fest) => (isSameOrBetween(date, fest.festivalStart, fest.festivalEnd) ? count + 1 : count),
      0
    );
  };

  const getTileClassName = ({ date, view }) => {
    // 선택된 날짜만 강조
    if (view === "month" && value.toDateString() === date.toDateString()) {
      return "selected-day";
    }
    // data-day 관련 로직 제거
    return null;
  };

    
const toggleStar = (festivalId) => {
  setActiveStars(prev => {
    const isActive = prev[festivalId]; // 현재 별 상태
    const updated = {
      ...prev,
      [festivalId]: !isActive
    };

    // API 요청 (활성화 → 삭제 / 비활성화 → 등록)
    if (isActive) {
      // 활성화된 상태였으면 삭제
      deleteBookmark(festivalId)
        .then(res => console.log("북마크 삭제 성공:", res))
        .catch(err => console.error("북마크 삭제 실패:", err));
    } else {
      // 비활성화 상태였으면 등록
      handleBookmark(festivalId)
        .then(res => console.log("북마크 등록 성공:", res))
        .catch(err => console.error("북마크 등록 실패:", err));
    }

    return updated;
  });
};


  const fetchTop = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/calendar/popular`);
      setTopdata(response.data?.data || []); // 배열만 세팅
      console.log("Top 5", response.data);
    } catch (err) {
      console.error("top 5데이터 불러오기 실패:", err);
      setTopdata([]); // 실패 시에도 배열 유지
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    const today = new Date();
    handleMonthCalendar(today.getFullYear(), today.getMonth() + 1);
    fetchTop();
  }, []); // 첫 렌더링 시 실행





  return (
    <Container>
      <Header>축제 달력</Header>
      <CalendarWrap>
        <Calendar
          onChange={(newDate) => {
            setValue(newDate);
            handleCalendar(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate());
          }}
          onActiveStartDateChange={({ activeStartDate }) => {
            handleMonthCalendar(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1);
          }}
          value={value}
          tileClassName={getTileClassName}
          tileContent={({ date, view }) =>
            view === "month" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "0.8rem" }}>
                <span>{date.getDate()}</span>
                {getFestivalCountForDate(date) > 0 && (
                  <span style={{ fontSize: "0.6rem", color: "#32885D", marginTop: 2 }}>
                    {getFestivalCountForDate(date)}
                  </span>
                )}
              </div>
            ) : null
          }
        />
      </CalendarWrap>
      <HeaderContainer>
        <HeaderTwo>{festivalList.length > 0 ? "축제 리스트" : "인기 축제"}</HeaderTwo>
      </HeaderContainer>
      <ListContainer>
        {festivalList.length > 0
          ? festivalList.map((fest, idx) => (
            <ListBox
              key={fest.festivalId || idx}
              bg={fest.imagePath}
            >
              <BookM onClick={(e) => {
                e.stopPropagation();
                toggleStar(fest.festivalId);
              }}>
                {activeStars[fest.festivalId]
                  ? <S width={22} height={22} />
                  : <Ss width={22} height={22} />}
              </BookM>
              <Arrow onClick={() =>
                navigate("/detail", { state: { festivalId: fest.festivalId } })
              }>
                <Wa />
              </Arrow>
              <ListFooter>
                <Title>{fest.festivalName}</Title>
                <Subtitle>
                  {`${fest.festivalStart} ~ ${fest.festivalEnd}`}
                </Subtitle>
              </ListFooter>
            </ListBox>
          ))
          : (topdata || []).map((fest, idx) => (
            <ListBox
              key={fest.festivalId || idx}
              bg={fest.imagePath}
            >
              <BookM onClick={(e) => {
                e.stopPropagation();
                toggleStar(fest.festivalId);
              }}>
                {activeStars[fest.festivalId]
                  ? <S width={22} height={22} />
                  : <Ss width={22} height={22} />}
              </BookM>
              <Arrow onClick={() =>
                navigate("/detail", { state: { festivalId: fest.festivalId } })
              }>
                <Wa />
              </Arrow>
              <ListFooter>
                <Title>{fest.festivalName}</Title>
                <Subtitle>
                  {`${fest.festivalStart} ~ ${fest.festivalEnd}`}
                </Subtitle>
              </ListFooter>
            </ListBox>
          ))}
      </ListContainer>
    </Container>
  )
}