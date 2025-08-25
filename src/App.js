import React from "react";
import styled from "styled-components";
import RouterComponent from "./router";
import { BrowserRouter, useLocation } from "react-router-dom";
import MyNavBar from "./components/navbar";

const Container = styled.div`
  display: flex;
  justify-content : center;
  align-items: center;
  flex-direction: column;
`

const AppWrapper = styled.div`
  display: flex;
  justify-content:center ;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 100vh; /* 뷰포트 높이만큼 최소 높이 설정 */
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  height: auto; /* NavBar의 높이(5rem)를 뺀 만큼의 높이 */
  overflow-y: auto;
`;

function AppContent() {
  const location = useLocation();

  // Navbar 숨길 경로 목록
  const hideNavbarRoutes = ["/", "/signin", "/keyword", "loading"];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <Container>
      <Main>
        <RouterComponent />
      </Main>
      {showNavbar && <MyNavBar />}
    </Container>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <AppContent />
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
