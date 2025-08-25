import styled from "styled-components";
import bgImage from "../assets/signup-bg.png";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import { useLocation } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 24.5625rem;
  height: 53.25rem; 
  box-sizing: border-box;
  padding: 7.69rem -0.1rem 4rem 0.7rem;
  background: #f7f7f7;
  font-family: sans-serif;
  align-items: center;      /* 가로 중앙 */
  justify-content: center; 
  background: url(${bgImage}) no-repeat center center;
  background-size: contain;
  margin: 0 auto;
  overflow-y: auto;
`;

const DetailContainer = styled.div`
position: relative;
    width: 21.6875rem;
    height: 43.5625rem;
    padding : 1.25rem 0.6rem 2.5rem 0.6rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: 1.25rem;
    background: #FFF;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
    margin-top: 2rem;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const DetailTitle = styled.h1`
    margin : 0;
    color: #35C16D;
    text-align: center;
    -webkit-text-stroke-width: 0.1px;
    -webkit-text-stroke-color: #455445;
    font-family: "TJJoyofsingingB";
    font-size: 2rem;
    margin-bottom: 0.35rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 0.65rem;
    white-space: nowrap;        /* 한 줄로 유지 */
    overflow: hidden;           /* 넘친 내용 숨기기 */
    text-overflow: ellipsis;    /* ... 표시 */
    max-width: 15rem;           /* 필요에 따라 조정 */
`

const Star = styled(FaStar)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.1rem;
  fill: ${({ $active }) => ($active ? "#FFEB34" : "#ccc")};
  cursor: pointer;
`;

const DayText = styled.h3`
    margin-top: 0.31rem;
    margin: 0;
    color: #111;
    font-family: "TJ Joy of singing TTF";
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    margin-left: 0.65rem;
`

const RegText = styled.h3`
    margin : 0;
    color: #111;
    margin-left: 0.65rem;
    font-family: "TJ Joy of singing TTF";
    font-size: 0.65rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 0.9625rem */
`
const Img = styled.div`
    width: 20.5rem;
    height: 12.3125rem;
    border-radius: 0.625rem;
    margin-top: 0.62rem;
    background-image: url(${props => props.src || ""});
    background-size: cover;
    background-position: center;
`

const IntroTitle = styled.h3`
    margin: 0;
    color: #000;
    font-family: "TJ Joy of singing TTF";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 1rem;
    margin-left: 1.06rem;
`

const IntroDetail = styled.h3`
    margin : 0;
    width : 18.31rem;
    height : 5.5rem;
    color: #000;
    font-family: "TJJoyofsingingL";
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin-top: 0.62rem;
    margin-left: 1.06rem;
    overflow: hidden;
    text-overflow: ellipsis;
    
    
`

const AiContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const AiReview = styled.div`
  margin: 0;
  width: 18.31rem;
  max-height: 10rem;   
  color: #000;
  font-family: "TJJoyofsingingL";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 0.62rem;
  margin-left: 1.06rem;
  overflow-y: auto;   /* 스크롤 가능 */
  white-space: pre-wrap; /* 줄바꿈 유지 */
`;

const BtnContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.87rem;
`

const DetailBtn = styled.div`
    width: 10.4375rem;
    height: 2.6875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6.25rem;
    background: #32885D;
    color: #FFFF;
    font-family: "TJJoyofsingingB";
    cursor: pointer;
`


const BackConatiner = styled.div`
    display: inline-flex;
    flex : 1;
    position: absolute;
    margin-bottom : 46.3rem;
    margin-right: 19rem;
    width : 2.53rem;
    height : 2.53rem;
    padding: 0.375rem;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 6.25rem;
    background: #FFF;
`

const BackBtn = styled.div`
    width: 1.77738rem;
    height: 1.77738rem;
    background-color: #66CE94;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.25rem;
    cursor: pointer;
`
const Back = styled(FaArrowLeft)`
    fill: #FFFF;
    border-radius: 0.5rem;
`

export default function Detail() {

  const Navigate = useNavigate();
  const [festivalData, setFestivalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { festivalId } = location.state || {}; // state에서 festivalId 가져오기
  const [activeStars, setActiveStars] = useState({});
  const [markData, setMarkData] = useState(null);

  console.log("받은 festivalId:", festivalId);

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



  useEffect(() => {
    if (!festivalId) return;

    const fetchFestival = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/calendar/${festivalId}`);
        setFestivalData(response.data);
        console.log("받았다", response.data);

      } catch (err) {
        console.error("축제 데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFestival();
  }, [festivalId]);

  const deleteBookmark = async (bookmarkId) => {
    try {
      const response = await axiosInstance.delete(`/${festivalId}`);
      console.log("북마크 삭제 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("북마크 삭제 실패:", error.response?.data || error.message);
      throw error;
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





  return (
    <Container>
      <BackConatiner>
        <BackBtn onClick={() => Navigate(-1)}>
          <Back />
        </BackBtn>
      </BackConatiner>
      {loading ? (
        <p>로딩 중...</p>
      ) : !festivalData ? (
        <p>데이터가 없습니다.</p>
      ) : (
        <DetailContainer>
          <TitleContainer>
            <DetailTitle>{festivalData.festivalName}</DetailTitle>
            <Star
              $active={activeStars[festivalId]} // 현재 festivalId에 대한 활성화 여부
              onClick={() => toggleStar(festivalId)} // 클릭 시 festivalId 전달
            />
          </TitleContainer>
          <DayText>{festivalData.festivalStart} - {festivalData.festivalEnd}</DayText>
          <RegText>{festivalData.festivalLoca}</RegText>
          <Img src={festivalData.imagePath} />
          <IntroTitle>소개</IntroTitle>
          <IntroDetail>
            {festivalData.festivalDesc}
          </IntroDetail>
          <AiContainer>
            <IntroTitle>AI 리뷰</IntroTitle>
          </AiContainer>
          <AiReview>
            {festivalData.aiReview}
          </AiReview>
          <BtnContainer>
            <DetailBtn onClick={() => Navigate("/review", { state: { festivalId: festivalId } })}>전체 리뷰 보기</DetailBtn>
          </BtnContainer>
        </DetailContainer>)}
    </Container>
  )
}