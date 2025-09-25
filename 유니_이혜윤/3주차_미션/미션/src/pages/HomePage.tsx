import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const HomePage = () => {
  return (
    <div className="bg-black/95">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
