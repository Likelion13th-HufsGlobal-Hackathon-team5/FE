import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as Up } from "../assets/up.svg";
import bg from "../assets/review_bg.png";
import backicon from "../assets/back_blue.svg";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.5625rem; 
  height: 53.25rem;   
  background-image: url(${bg});
  position: relative;
  overflow: hidden;
`;

/* 뒤로가기 버튼 */
const BackButton = styled.button`
    width: 2.5275rem;             
  height: 2.5275rem;
  border-radius: 6.25rem;
  background-image: url(${backicon});
  background-size: cover;  
  background-position: center;
  background-repeat: no-repeat;
  align-self: flex-start;
  margin: 0.625rem 0 0 0.625rem;
  border: none;
  cursor: pointer;
  padding: 1.1rem 0;
`;

/* 헤더 박스 */
const ReviewBox = styled.div`
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

/* 리뷰 글씨 */
const Title = styled.div`
  border-radius: 0 2.5rem 2.5rem 0;
  background: #93E6F2;
  padding: 0.375rem 1.9688rem;
  font-family: "DNFBitBit";
  font-weight: 500;
  font-size: 1.5rem;
    color: #fff;
`;

const ReviewList = styled.div`
display: flex;
  margin-top: 1rem;
  width: 21.6875rem;
  flex-direction: column;
  align-items: stretch;
  gap: 0.9375rem;
  overflow-y: auto;   
  padding: 0.5rem 0.8rem;
  max-height: 40rem;   
`;

const ReviewItem = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem;
background: #FFF;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
font-family: "TJ Joy of singing TTF";
font-size: 0.9375rem;
font-style: normal;
font-weight: 700;
line-height: 140%; 
padding: 0.94rem;
padding-bottom: 0.84rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ReviewTitle = styled.span`
color: #000;
`;

const ReviewContent = styled.p`
  margin-top: 0.62rem;
  font-size: 0.9rem;
  white-space: pre-line;
color: #9FB0C9;
`;

const WriteButton = styled.button`
position: absolute;  
  bottom: 1rem;
  right: 1rem;
  display: inline-flex;
padding: 0.8125rem 1.375rem;
justify-content: center;
align-items: center;
gap: 0.625rem;
border-radius: 6.25rem;
border: 2px solid #70B5BF;
background: #93E6F2;
color: #FFF;
font-family: "TJ Joy of singing TTF";
font-size: 1.1875rem;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.02969rem;
cursor: pointer;
`;


const ReviewPage = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const navigate = useNavigate();


  const reviews = [
    { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
    {
      title: "좋았어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~
먹을 게 많아요
관계자 분들이 친절해요
.
..
....
......`,
    },
    { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
    },
    { title: "굿",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
    { title: "별로예요",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
    { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
    { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
     { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
     { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
     { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
     { title: "정말 재미있었어요!",
      content: `혼자 가도 재미있게 즐길 수 있어요~`
     },
  ];

  const toggleOpen = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}/>
      <ReviewBox>
        <Title>
          <span>전체 리뷰</span>
        </Title>
      </ReviewBox>
      <ReviewList>
        {reviews.map((review, index) => (
          <ReviewItem key={index}>
            <ReviewHeader onClick={() => toggleOpen(index)}>
              <ReviewTitle>{review.title}</ReviewTitle>
              {openIndexes.includes(index) ? <Up /> : <Down />}
            </ReviewHeader>
            {openIndexes.includes(index) && review.content && (
              <ReviewContent>{review.content}</ReviewContent>
            )}
          </ReviewItem>
        ))}
      </ReviewList>

      <WriteButton onClick={() => navigate("/newreview")}
        >리뷰 작성하기</WriteButton>
    </Container>
  );
};

export default ReviewPage;