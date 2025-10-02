import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar.tsx";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* 자식 라우트가 랜더링될 자리*/}
    </div>
  );
}
