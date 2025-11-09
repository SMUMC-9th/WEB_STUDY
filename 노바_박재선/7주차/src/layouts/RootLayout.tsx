import { Outlet} from "react-router-dom";

import { useState } from "react"; 
import Navbar from "../components/Navbar";
import { SidebarContent } from "../components/SidebarContent";


const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white">
        <Navbar onMenuClick={()=> setIsSidebarOpen((prev)=>!prev)}/>
        <div className="flex flex-1 overflow-hidden">
            <aside className="hidden lg:flex flex-shrink-0 w-60 bg-black">
                <SidebarContent />
            </aside>

            {isSidebarOpen && (
                <>
                  <div 
                      className="fixed inset-0 top-24 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
                      onClick={() => setIsSidebarOpen(false)}
                  ></div>
                  <div className="fixed top-24 left-0 h-full w-60 bg-black z-50 flex lg:hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}">
                      <SidebarContent onClose={() => setIsSidebarOpen(false)} />
                  </div>
                </>
            )}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    </div>
  );
}

export default RootLayout;