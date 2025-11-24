import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/footer.tsx";

export default function RootLayout() {
  return (
    <div className={"flex flex-col min-h-screen"}>
      <Navbar /> {/* 항상 화면 상단 고정*/}
      <div className={"flex-1"}>
        <Outlet />
      </div>
      {/* 자식 페이지가 렌더링될 자리 */}
      <Footer />
    </div>
  );
}
