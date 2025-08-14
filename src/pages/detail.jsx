import styled from "styled-components";
import bgImage from "../assets/signup-bg.png";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 24.5625rem;
  height: 49.25rem; 
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
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const DetailTitle = styled.h1`
    margin : 0;
    color: #35C16D;
    text-align: center;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #455445;
    font-family: "TJJoyofsingingB";
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 0.65rem;
`

const Star = styled(FaStar)`
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 0.1rem;
  fill: ${({ $active }) => ($active ? "#FFEB34" : "#ccc")};
  margin-left: 5.31rem;
`;

const DayText = styled.h3`
    margin-top: 0.31rem;
    margin: 0;
    color: #111;
    font-family: "TJJoyofsingingB";
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    margin-left: 0.65rem;
`

const RegText = styled.h3`
    margin : 0;
    color: #111;
    font-family: "TJJoyofsingingB";
    font-size: 0.6875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    margin-left: 0.65rem;
`
const Img = styled.div`
    width: 20.5rem;
    height: 12.3125rem;
    border-radius: 0.625rem;
    background-color: skyblue;
    margin-top: 0.62rem;
`

const IntroTitle = styled.h3`
    margin: 0;
    color: #000;
    font-family: "TJJoyofsingingB";
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
`
const Back = styled(FaArrowLeft)`
    fill: #FFFF;
    border-radius: 0.5rem;
`

export default function Detail(){

    const [activeStar, setActiveStar] = useState(false);
    const Navigate = useNavigate();

    const toggleStar = () => {
        setActiveStar((prev) => !prev);
    };


    return(
        <Container>
            <BackConatiner>
                <BackBtn>
                    <Back/>
                </BackBtn>
            </BackConatiner>
            <DetailContainer>
                <TitleContainer>
                    <DetailTitle>풍선 축제</DetailTitle>
                    <Star $active={activeStar} onClick={toggleStar} />
                </TitleContainer>
                <DayText>2025. 07.30 - 08.20</DayText>
                <RegText>경기도 용인시 처인구 모현읍 외대로 81</RegText>
                <Img />
                <IntroTitle>소개</IntroTitle>
                <IntroDetail>알록달록한 대형 풍선이 하늘을 수놓는 마을 축제예요. 낮에는 가족 단위 체험 부스가 열리고, 밤에는 풍선 불빛 퍼레이드가 펼쳐져요!
                인생샷 찍기 딱 좋은 포토존도 가득해요 :)
                </IntroDetail>
                <AiContainer>
                    <IntroTitle>AI 리뷰</IntroTitle>
                </AiContainer>
                <IntroDetail>
                    사진 찍기 좋은 포토존이 많고, 분위기가 너무 아기자기해요! 밤에 열리는 풍선 퍼레이드는 꼭 봐야 해요!
                </IntroDetail>
                <BtnContainer>
                    <DetailBtn onClick={() => Navigate("/review")}>전체 리뷰 보기</DetailBtn>
                </BtnContainer>
            </DetailContainer>
        </Container>
    )
}