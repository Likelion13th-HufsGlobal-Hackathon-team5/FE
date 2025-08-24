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
    background: linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%) lightgray 50% / cover no-repeat;
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

export default function BookmarkPage() {
  const navigate = useNavigate();
  const [markData, setMarkData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookMarkData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/mypage/bookmarks");
        setMarkData(response.data.data);
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
              bg={item.festival.festivalImage || sampleImage}
            >
              <CardText>
                <Title>{item.festival.festivalName}</Title>
                <Date>
                  {item.festival.festivalStart} ~ {item.festival.festivalEnd}
                </Date>
              </CardText>
              <Arrow onClick={() => navigate(`/detail/${item.festival.festivalId}`)}>
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