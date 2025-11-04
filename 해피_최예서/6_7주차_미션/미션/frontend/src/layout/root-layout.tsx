import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar.tsx";
import Footer from "../components/common/footer.tsx";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* 상단 고정 */}
      <main className="flex-1 relative z-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
