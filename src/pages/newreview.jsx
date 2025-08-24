import React, { useState } from "react";
import styled from "styled-components";
import bg from "../assets/review_bg.png"
import backicon from "../assets/back_blue.svg"; 
import { ReactComponent as Crt } from "../assets/thumb.svg"; 
import { useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24.5625rem; 
  height: 53.25rem;   
  background-image: url(${bg});
  position: relative;
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
`;

const Title = styled.div`
    color: #93E6F2;
    text-align: center;
    -webkit-text-stroke-width: 1.7px;
    -webkit-text-stroke-color: #455445;
    font-family: "TJ Joy of singing TTF";
    font-size: 3rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-top: 0.5rem;
`;

const Form = styled.div`
    width: 21.6875rem;
    height: 34.3125rem;
    display: inline-flex;
    padding: 1.875rem 1.125rem;
    flex-direction: column;
    align-items: center;
    gap: 1.125rem;
    margin-top: 0.75rem;
    border-radius: 1.25rem;
    background: #FFF;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
`;

const Input = styled.input`
    width: 19.4375rem;
    padding: 0.5625rem 9.3125rem 0.5rem 0.625rem;
    border-radius: 0.625rem;
    background: #DFF7FB;
    font-size: 1rem;
    color: #333;
    border: none;
    font-family: "TJ Joy of singing TTF";
    font-size: 1.0625rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; 
    box-sizing: border-box;
    ::placeholder {
        color: #9FB0C9;
    }
    &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
    width: 19.4375rem;
    height: 16.5625rem;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #333;
    resize: none;
    padding: 0.5625rem 9.3125rem 0.5rem 0.625rem;
    border-radius: 0.625rem;
    border: none;
    font-family: "TJ Joy of singing TTF";
    font-size: 1.0625rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; 
    background: #DFF7FB;
    box-sizing: border-box;
  ::placeholder {
    color: #9FB0C9;
  }
  &:focus {
    outline: none;
  }
`;

const UploadButton = styled.button`
    width: 8.125rem;
    height: 3rem;
    box-sizing: border-box;
    background: #93E6F2;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
    border-radius: 6.25rem;
    color: #FFF;
    font-family: "TJ Joy of singing TTF";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.03125rem;
    border: none;
    padding: 0.75rem;
    font-size: 1.25rem;
    cursor: pointer;
    margin-top: 6.5rem;
`;

const CrtWrapper = styled.div`
  position: absolute;
  bottom: 0;  
  right: 0;   
`;

function ReviewPage() {
    const navigate = useNavigate();

    const [mockFes] = useState({
        name: "풍선 축제"
      });      
  const [title, setTitle] = useState("");   
  const [content, setContent] = useState(""); 
  const savedUserId = localStorage.getItem("userId");
  const location = useLocation();
  const { festivalId } = location.state || {}; // state에서 festivalId 가져오기



    const handleUpload = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    try {
      const response = await axiosInstance.post("/reviews", {
    festivalId : festivalId,
    userId : savedUserId,
    reviewTitle : title,
    reviewCont : content
    });
      console.log("리뷰 작성 후 토큰:", localStorage.getItem("accessToken"));
      console.log("업로드 성공:", response.data);
      await new Promise((res) => setTimeout(res, 500));

      alert("리뷰가 성공적으로 등록되었습니다!");
      navigate(-1); 
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}/>
      <Title>{mockFes.name}</Title>
      <Form>
        <Input
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="내용을 입력해 주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <UploadButton onClick={handleUpload}>
          업로드
        </UploadButton>
      </Form>
      <CrtWrapper>
        <Crt />
      </CrtWrapper>
    </Container>
  );
}

export default ReviewPage;