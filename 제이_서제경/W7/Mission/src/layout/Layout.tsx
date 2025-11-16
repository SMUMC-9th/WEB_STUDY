import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import WriteModal from "../components/Modal/WriteModal";
import { useSidebar } from "../hooks/useSidebar";
import { useState } from "react";

const Layout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, open, close, toggle } = useSidebar();

  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="h-dvh flex flex-col">
      <Header onMenuClick={toggle} />
      <Sidebar isOpen={isOpen} onClose={close} />
      <main className={`transition-all duration-300 flex-1 px-4 pt-4`}>
        <Outlet />
      </main>

      <button
        onClick={() => setAddModalOpen(true)}
        className="fixed bottom-10 right-10 flex items-center justify-center
                   w-14 h-14 rounded-full bg-white/60 backdrop-blur-md
                   border border-gray-200 shadow-lg text-3xl text-black
                    hover:bg-white transition-all duration-200 z-90"
      >
        +
      </button>

      {addModalOpen && (
        <WriteModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Layout;

