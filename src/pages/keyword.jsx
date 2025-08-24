import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bg from "../assets/signup-bg.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import { ReactComponent as Star } from "../assets/kw_star.svg"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.5625rem; 
  height: 53.25rem;   
  background-image: url(${bg});
  padding-top: 1.8rem;
  position: relative;
`;

const KeywordBox = styled.div`
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

const KeywordTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0 2.5rem 2.5rem 0;
  background: #66ce94;
  padding: 0.375rem 1.44rem;
  padding-right: 2rem;
  font-family: "DNFBitBit";
  font-weight: 500;
  font-size: 1.5rem;
    color: #fff;
`;

const Content = styled.div`
    color: #737373;
    font-family: "TJ Joy of singing TTF";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; 
    align-self: flex-start;
    padding: 0.63rem 0 0.7rem 1.4rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
  overflow: auto;
  margin-bottom: 4.5rem;
  padding: 0.3rem;
`;

const KeywordButton = styled.button`
    background-color: ${({ selected }) => (selected ? "#FEF5AA" : "#FCFAF0")};
    padding: 0.95rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
    width: 6.5625rem;
    height: 7.375rem;
    border-radius: 0.5rem;
    border: none;
    box-shadow: ${({ selected }) => (selected ? "0 0 0 2px #A9A9A9" : "0 0 0 1px #E5E5E5")};
`;

const Icon = styled.div`
  align-self: flex-end;
`;

const Label = styled.div`
  width: 100%;
  text-align: left; 
  color: #3F3F3F;
  font-family: "TJ Joy of singing TTF";
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-items: flex-start;
`;

const ActionButton = styled.button`
    position: absolute; 
    bottom: 1.69rem;         
    left: 50%;
    transform: translateX(-50%);
    padding: 0.8rem 0;
    border: none;
    border-radius: 12px;
    width: 13.5625rem;
    height: 3.625rem;
    border-radius: 6.25rem;
    background: #66CE94;
    box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.25);

    color: #FFF;
    font-family: "TJ Joy of singing TTF";
    font-size: 1.8125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
`;

export default function KeywordSelector() {
  const [keywords, setKeywords] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  // const keywordMocking = [
  //   { id: 1, label: "이유준", icon: "https://www.svgrepo.com/download/373300/mock.svg" },
  //   { id: 2, label: "이지연", icon: "https://www.svgrepo.com/download/373300/mock.svg" },
  // ];

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axiosInstance.get("/keywords");
        setKeywords(response.data.items);
        //setKeywords(keywordMocking);
      } catch (error) {
        console.error("키워드 불러오기 실패", error);
      }
    };
    fetchKeywords();
  }, []);

  const saveKeywords = async () => {
    try {
      const response = await axiosInstance.put(
        "/me/selected-keywords",
        { keywordIds: selectedIds }
      );

      if (response.data.success) {
        console.log("저장 성공:", response.data.data);
        navigate("/airecommend", { state: { selectedIds } });
      } else {
        alert(response.data.error?.message || "키워드 저장 실패");
      }
    } catch (error) {
      console.error("키워드 저장 실패", error);
      if (error.response?.status === 401) {
        console.log(error)
      } else if (error.response?.status === 400) {
        alert("유효하지 않은 키워드가 포함되어 있습니다.");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Container>
      <KeywordBox>
        <KeywordTitle>
          <Star />키워드
        </KeywordTitle>
      </KeywordBox>
      <Content>원하는 키워드를 선택해 주세요! <br />
        키워드를 바탕으로 AI가 축제를 추천해 줘요 :)</Content>
      <Grid>
        {keywords.map((k) => (
          <KeywordButton
            key={k.id}
            selected={selectedIds.includes(k.id)}
            onClick={() => toggleSelect(k.id)}
          >
            <Label>
              {k.label}</Label>
            <Icon><img width={50} height={50} src={k.icon} /></Icon>
            {/* <Icon><k.icon /></Icon> */}
          </KeywordButton>
        ))}
      </Grid>
      <ActionButton onClick={saveKeywords}>Let's go!

      </ActionButton>
    </Container>
  );
}