import React from "react";
import styled from "styled-components";
import { ReactComponent as Mp } from "../assets/mypage.svg";
import { ReactComponent as Ai } from "../assets/ai.svg";
import { ReactComponent as Cd } from "../assets/calendar.svg";
import { ReactComponent as Bm } from "../assets/bookmark.svg";
import { Link, useLocation } from "react-router-dom";

const NavBar = styled.nav`
  width: 24.5625rem;
  height: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  filter: drop-shadow(0 -1px 4px rgba(0, 0, 0, 0.25));
  background-color: #FCFAF0;
  border-radius: 1rem 1rem 0 0;
  position: fixed;
  bottom: 0;
  z-index: 100;
  left: 50%; 
  transform: translateX(-50%);
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #32885d;
  font-family: "TJJoyofsingingB";
  font-size: 0.9375rem;
  font-style: normal;
  line-height: normal;
  cursor: pointer;
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#00CA98" : "#32885d")};
  
  svg {
    width: auto;
    height: auto;
    fill: ${({ $active }) => ($active ? "#00CA98" : "#32885d")};
    margin-bottom: 0.5rem;
  }
`;

export default function MyNavBar() {
    const location = useLocation();
    return (
        <NavBar>
        <NavItem to ="/mypage" $active={location.pathname === "/mypage"}>
            <Mp />
            <span>마이페이지</span>
        </NavItem>
        <NavItem to ="/keyword" $active={location.pathname === "/keyword"}>
            <Ai />
            <span>AI추천</span>
        </NavItem>
        <NavItem to="/main" $active={location.pathname === "/main"}>
            <Cd />
            <span>달력</span>
        </NavItem>
        <NavItem to ="/bookmark" $active={location.pathname === "/bookmark"}>
            <Bm />
            <span>북마크</span>
        </NavItem>
        </NavBar>
    );
}