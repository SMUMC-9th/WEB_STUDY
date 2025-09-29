import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

export default function RootLayout() {
  return (
    <div>
      <Navbar /> {/* 항상 화면 상단 고정*/}
      <Outlet /> {/* 자식 페이지가 렌더링될 자리 */}
    </div>
  );
}
