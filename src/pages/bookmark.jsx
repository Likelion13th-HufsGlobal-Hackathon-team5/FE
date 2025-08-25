import React from "react";
import styled from "styled-components";
import sampleImage from "../assets/review_bg.png";
import bg from "../assets/signup-bg.png";
import bb from "../assets/back.svg";
import { ReactComponent as Go } from "../assets/go.svg"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../AxiosInstance";
import { useState } from "react";
import { ReactComponent as Ss } from "../assets/Star-stroke.svg"
import { ReactComponent as S } from "../assets/Star 4.svg"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.5625rem; 
  height: 53.25rem;   
  background-image: url(${bg});
`;

const BackButton = styled.button`
    width: 2.5275rem;             
  height: 2.5275rem;
  border-radius: 6.25rem;
  background-image: url(${bb});
  background-size: cover;  
  background-position: center;
  background-repeat: no-repeat;
  align-self: flex-start;
  margin: 0.625rem 0 0 0.625rem;
  border: none;
  cursor: pointer;
`;

const BmBox = styled.div`
  display: flex;
  width: 10.25rem;
  padding: 0.375rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: flex-start;
  box-sizing: border-box;
  margin-top: 0.5rem;
`;

const BmTitle = styled.div`
  border-radius: 0 2.5rem 2.5rem 0;
  background: #66ce94;
  padding: 0.375rem 2.3rem;
  font-family: "DNFBitBit";
  font-weight: 500;
  font-size: 1.5rem;
    color: #fff;
`;

const CardList = styled.div`
    display: flex;
    width: 21.6875rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.44rem; 
    overflow-y: scroll;   
    flex: 1;  
`;

const Card = styled.div`
    position: relative;
    display: flex;
    width: 21.6875rem;
    height: 12.5rem;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0.625rem;
    border-radius: 1.25rem;
    border: 1.5px solid #A9A9A9;
    flex-shrink: 0;
    background-image: 
    linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%),
    url(${props => props.bg || sampleImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const CardText = styled.div`
    position: absolute;
    color: #111;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.125rem;
    font-family: "TJ Joy of singing TTF";
    margin: 0.6rem;
`;

const Title = styled.div`
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Date = styled.div`
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
`;

const Arrow = styled.div`
    position: absolute;
    bottom: 0.37rem;
    right: 0.37rem;
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
`;

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

export default function BookmarkPage() {
  const navigate = useNavigate();
  const [markData, setMarkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStars, setActiveStars] = useState({});

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


  useEffect(() => {
    const fetchBookMarkData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/mypage/bookmarks");
        setMarkData(response.data.data);
        const initialStars = {};
        response.data.data.items.forEach(item => {
          initialStars[item.festival.festivalId] = true;
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

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)} />
      <BmBox>
        <BmTitle>북마크</BmTitle>
      </BmBox>
      <CardList>
        {markData?.items?.length > 0 ? (
          markData.items.map((item) => (
            <Card
              key={item.bookmarkId}
              bg={item.festival.imagePath || sampleImage}
            >
              <CardText>
                <Title>{item.festival.festivalName}</Title>
                <Date>
                  {item.festival.festivalStart} ~ {item.festival.festivalEnd}
                </Date>
              </CardText>
              <BookM onClick={(e) => {
                e.stopPropagation();
                toggleStar(item.festival.festivalId);
              }}>
                {activeStars[item.festival.festivalId]
                  ? <S width={22} height={22} />
                  : <Ss width={22} height={22} />}
              </BookM>
              <Arrow onClick={() =>
                navigate("/detail", { state: { festivalId: item.festivalId } })
              }>
                <Go />
              </Arrow>
            </Card>
          ))
        ) : (
          <div>북마크가 없습니다.</div>
        )}
      </CardList>
    </Container>
  );
}