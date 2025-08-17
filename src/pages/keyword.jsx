import React, { useState } from "react";
import styled from "styled-components";
import bg from "../assets/signup-bg.png"
import { useNavigate } from "react-router-dom";
import { ReactComponent as Star } from "../assets/kw_star.svg"
import { ReactComponent as Music } from "../assets/react-icons/BiSolidMusic.svg";
import { ReactComponent as Camera } from "../assets/react-icons/BsFillCameraFill.svg";
import { ReactComponent as Leaf } from "../assets/react-icons/FaLeaf.svg";
import { ReactComponent as Person } from "../assets/react-icons/FaPersonHiking.svg";
import { ReactComponent as Drink } from "../assets/react-icons/BiSolidDrink.svg";
import { ReactComponent as Yin } from "../assets/react-icons/BsYinYang.svg";
import { ReactComponent as Chat } from "../assets/react-icons/BsChatLeftHeartFill.svg";
import { ReactComponent as Store } from "../assets/react-icons/FaStore.svg";
import { ReactComponent as Water } from "../assets/react-icons/FaWaterLadder.svg";
import { ReactComponent as Energy } from "../assets/react-icons/GiPartyFlags.svg";
import { ReactComponent as Sparkle } from "../assets/react-icons/GiSparkles.svg";
import { ReactComponent as Spoon } from "../assets/react-icons/ImSpoonKnife.svg";
import { ReactComponent as Dog } from "../assets/react-icons/LuDog.svg";
import { ReactComponent as Baby } from "../assets/react-icons/PiBabyBold.svg";
import { ReactComponent as Quiet } from "../assets/react-icons/quiet.svg";


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
font-size: ${({ selected, long }) => (long ? "0.89rem" : "0.9375rem")};
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

const keywords = [
  { id: 1, label: "힐링하기 좋은", icon: Leaf },
  { id: 2, label: "좋은 음악이 있는", icon: Music },
  { id: 3, label: "혼자도 즐길 수 있는", icon: Person },
  { id: 4, label: "사진 찍기 좋은", icon: Camera },
  { id: 5, label: "먹거리가 많은", icon: Spoon },
  { id: 6, label: "전통 문화를 즐길 수 있는", icon: Yin },
  { id: 7, label: "불꽃놀이가 있는", icon: Sparkle },
  { id: 8, label: "아이와 함께 즐길 수 있는", icon: Baby },
  { id: 9, label: "데이트하기 좋은", icon: Chat },
  { id: 10, label: "에너지가 넘치는", icon: Energy },
  { id: 11, label: "조용히 즐길 수 있는", icon: Quiet },
  { id: 12, label: "강아지와 즐길 수 있는", icon: Dog },
  { id: 13, label: "물놀이 할 수 있는", icon: Water },
  { id: 14, label: "플리마켓이 있는", icon: Store },
  { id: 15, label: "술을 맛볼 수 있는", icon: Drink },
  { id: 16, label: "술을 맛볼 수 있는", icon: Drink },
  { id: 17, label: "술을 맛볼 수 있는", icon: Drink },

];

export default function KeywordSelector() {
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

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
            <Label 
            selected={selectedIds.includes(k.id)} long={k.label.length > 11}>
                {k.label}</Label>
            <Icon><k.icon /></Icon>
          </KeywordButton>
        ))}
      </Grid>
      <ActionButton onClick={() => navigate("/airecommend")}>Let's go!

      </ActionButton>
    </Container>
  );
}