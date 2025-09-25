import { Outlet } from "react-router-dom";
import { Navbar, ScrollToTop } from "../components";

const HomePage = () => {
  return (
    <div className="bg-black/95">
      <Navbar />
      <ScrollToTop />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
