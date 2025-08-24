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
    font-size: 3rem;
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
  width: 5.5rem;
  height: 3.5rem;
  margin-right: 1rem;
  border-radius: 0.1rem;
  fill: ${({ $active }) => ($active ? "#FFEB34" : "#ccc")};
  margin-left: 5.31rem;
  cursor: pointer;
`;

const DayText = styled.h3`
    margin-top: 0.31rem;
    margin: 0;
    color: #111;
    font-family: "TJ Joy of singing TTF";
    font-size: 0.9375rem;
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
    font-size: 0.6875rem;
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
    color: #000;
    font-family: "TJJoyofsingingL";
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin-top: 0.62rem;
    margin-left: 1.06rem;
`

const AiContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const BtnContainer =styled.div`
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

export default function Detail(){

    const [activeStar, setActiveStar] = useState(false);
    const Navigate = useNavigate();
    const [festivalData, setFestivalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { festivalId } = location.state || {}; // state에서 festivalId 가져오기

    console.log("받은 festivalId:", festivalId);

    const toggleStar = () => {
        setActiveStar((prev) => !prev);
    };
        useEffect(() => {
        if (!festivalId) return;

        const fetchFestival = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/calendar/${festivalId}`);
                setFestivalData(response.data);
                console.log("받았다" ,response.data);
                
            } catch (err) {
                console.error("축제 데이터 불러오기 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFestival();
    }, [festivalId]);


    return(
        <Container>
            <BackConatiner>
                <BackBtn onClick={() => Navigate(-1)}>
                    <Back/>
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
                    <Star $active={activeStar} onClick={toggleStar} />
                </TitleContainer>
                <DayText>{festivalData.festivalStart} - {festivalData.festivalEnd}</DayText>
                <RegText>{festivalData.festivalLoca}</RegText>
                <Img src={festivalData.imagePath}/>
                <IntroTitle>소개</IntroTitle>
                <IntroDetail>
                    {festivalData.festivalDesc}
                </IntroDetail>
                <AiContainer>
                    <IntroTitle>AI 리뷰</IntroTitle>
                </AiContainer>
                <IntroDetail>
                    {festivalData.aiReview}
                </IntroDetail>
                <BtnContainer>
                    <DetailBtn onClick={() => Navigate("/review", { state: { festivalId: festivalId } })}>전체 리뷰 보기</DetailBtn>
                </BtnContainer>
            </DetailContainer>)}
        </Container>
    )
}