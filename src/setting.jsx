import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap : 1rem;
`
const SettingBtn = styled.div`
    width : 15rem;
    height : 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: skyblue;
    border-radius: 1rem;
    font-family: "TJJoyofsingingB";
`
const Setting = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <SettingBtn onClick={() => navigate("/logoutmodal")}>로그아웃 모달</SettingBtn>
      <SettingBtn onClick={() => navigate("/namemodal")}>닉네임 변경 모달</SettingBtn>
      <SettingBtn onClick={() => navigate("/passwordmodal")}>비번 변경 모달</SettingBtn>
      <SettingBtn onClick={() => navigate("/bookmark")}>북마크 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/keyword")}>키워드 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/loading")}>로딩 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/login")}>로그인 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/main")}>메인 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/mypage")}>마이 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/newreview")}>리뷰작성 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/review")}>리뷰 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/signin")}>회원가입 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/airecommend")}>AI추천 페이지</SettingBtn>
      <SettingBtn onClick={() => navigate("/idmodal")}>아이디 변경모달</SettingBtn>
      <SettingBtn onClick={() => navigate("/navbar")}>네브바</SettingBtn>
    </PageContainer>
  );
};

export default Setting;
