import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import WriteModal from "../components/Modal/WriteModal";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="h-dvh flex flex-col">
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className={`transition-all duration-300 flex-1 px-4 pt-4 ${
          sidebarOpen ? "pl-64" : ""
        }`}
      >
        <Outlet />
      </main>

      {/* 게시물 추가 버튼 */}
      <button
        onClick={() => setAddModalOpen(true)}
        className="fixed bottom-10 right-10 flex items-center justify-center
                   w-14 h-14 rounded-full bg-white/60 backdrop-blur-md
                   border border-gray-200 shadow-lg text-3xl text-black
                   hover:scale-105 hover:bg-white transition-all duration-200
                   z-[90]"
      >
        +
      </button>

      {/* 모달 */}
      {addModalOpen && <WriteModal onClose={() => setAddModalOpen(false)} />}

      <Footer />
    </div>
  );
};

export default Layout;
