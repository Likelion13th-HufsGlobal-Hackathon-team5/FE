import React, { useState } from "react";
import styled from "styled-components";
import bg from '../assets/signup-bg.png'
import Nav from '../components/navbar';
import bb from "../assets/back.svg"
import { useNavigate } from "react-router-dom";
import PasswordModal from "./modals/passwordmodal";
import LogoutModal from "./modals/logoutmodal";
import { ReactComponent as Star } from "../assets/Star 4.svg"

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.5625rem; 
  height: 53.25rem;  
  background-image: url(${bg});
`;

/* 뒤로가기 버튼 */
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

/* 마이페이지 박스 */
const MyPageBox = styled.div`
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

/* 마이페이지 글씨 */
const MyPageTitle = styled.div`
  border-radius: 0 2.5rem 2.5rem 0;
  background: #66ce94;
  padding: 0.375rem 1.44rem;
  font-family: "DNFBitBit";
  font-weight: 500;
  font-size: 1.5rem;
    color: #fff;
`;

/* 정보 박스 */
const InfoBox = styled.div`
  width: 21.6875rem;
  height: 20.0625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  padding: 1.25rem;
  box-sizing: border-box;
`;

const Name = styled.div`
  color: #000;
  font-family: "TJ Joy of singing TTF";
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;

`;

const Divider = styled.div`
  width: calc(100% + 2rem); 
  margin: 1.25rem -1rem 1.25rem -1rem;
  height: 0.0625rem;
  background: #ebebeb;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0 2rem 0;
`;

const Label = styled.span`
  color: #32885d;
  font-family: "TJ Joy of singing TTF";
font-size: 1.25rem;
font-style: normal;
font-weight: 500;
line-height: 140%; 
`;

const Value = styled.span`
  color: #000;
  font-family: "TJ Joy of singing TTF";
font-size: 1.25rem;
font-style: normal;
font-weight: 300;
line-height: 140%; 
`;

const EditButton = styled.button`
    display: flex;
    background-color: #32885d;
    color: #fff;
    border: none;
    border-radius: 6.25rem;
    padding: 0.25rem 0.75rem;
    gap: 1.25rem;
    cursor: pointer;
    padding: 0.25rem 0.4375rem;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-family: "TJ Joy of singing TTF";
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 300;
    line-height: 140%; 
`;

/* 북마크 모아보기 박스 */
const BookmarkBox = styled.div`
    width: 21.6875rem;
    height: 4.1875rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 1.19rem 6.88rem 1.12rem 1.25rem;       
    border-radius: 1.5rem;         
    background: #2E7D5B;                                     
    gap: 0.75rem;                  
    margin-top: 2.8rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    color: #FFF;
    font-family: "TJ Joy of singing TTF";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1; 
`;

/* 로그아웃 글자 */
const LogoutText = styled.div`
  color: #5e5e5e;
  font-family: "TJ Joy of singing TTF";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 8%;
  text-underline-offset: 40%;
  margin-top: 11.81rem;
  cursor: pointer;
`;

function MyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        nickname: "조아용",
        id: "joayong_123",
        birth: 2000,
        password: "******"
      });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);
    return (
        <MyPageContainer>
        {isModalOpen && <PasswordModal savedPassword={user.password} onClose={closeModal} />}
        {isLogoutModalOpen && <LogoutModal onClose={closeLogoutModal} />}
        <BackButton onClick={() => navigate(-1)} />

        <MyPageBox>
            <MyPageTitle>마이페이지</MyPageTitle>
        </MyPageBox>

        <InfoBox>
            <Name>{user.nickname} 님</Name>
            <Divider />
            <InfoRow>
            <Label>닉네임</Label>
            <Value>{user.nickname}</Value>
            </InfoRow>
            <InfoRow>
            <Label>아이디</Label>
            <Value>{user.id}</Value>
            </InfoRow>
            <InfoRow>
            <Label>출생 연도</Label>
            <Value>{user.birth}</Value>
            </InfoRow>
            <InfoRow>
            <Label>비밀번호</Label>
            <EditButton onClick={openModal}>수정</EditButton>
            </InfoRow>
        </InfoBox>

        <BookmarkBox onClick={() => navigate("/bookmark")}>
            <Star />
            북마크 모아보기</BookmarkBox>
        <LogoutText onClick={openLogoutModal}>로그아웃</LogoutText>
        </MyPageContainer>
    );
}

export default MyPage;