import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <header className="h-[60px] flex-shrink-0">
        <Header />
      </header>
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
      <Footer />

      <BackToTop threshold={30} />
    </div>
  );
};

export default HomeLayout;
