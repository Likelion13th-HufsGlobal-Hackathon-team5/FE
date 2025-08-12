import { Route, Routes } from "react-router-dom";
import LogoutModal from "./pages/modals/logoutmodal";
import NameModal from "./pages/modals/namemodal";
import PasswordModal from "./pages/modals/passwordmodal";
import BookMark from "./pages/bookmark";
import Detail from "./pages/detail";
import Keyword from "./pages/keyword";
import Loading from "./pages/loading";
import Login from "./pages/login";
import Main from "./pages/main";
import Mypage from "./pages/mypage";
import NewReview from "./pages/newreview";
import Review from "./pages/review";
import Signin from "./pages/signin";
import Setting from "./setting";

const RouterComponent = () => {
    return (
        <Routes>
          <Route path="/" element={<Setting />} />
          <Route path="/logoutmodal" element={<LogoutModal />} />
          <Route path="/namemodal" element={<NameModal />} />
          <Route path="/passwordmodal" element={<PasswordModal />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/keyword" element={<Keyword />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/newreview" element={<NewReview />} />
          <Route path="/review" element={<Review/>} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
    );
  };
  
  export default RouterComponent;