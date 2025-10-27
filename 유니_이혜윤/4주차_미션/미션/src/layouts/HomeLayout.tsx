import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
      <footer className="h-[60px] flex items-center justify-center bg-gray-100 text-gray-600 text-xs">
        푸터입니다 🍪
      </footer>
    </div>
  );
};

export default HomeLayout;
