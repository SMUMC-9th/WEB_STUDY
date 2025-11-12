import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar";


const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            
        </div>
    )
}

export default RootLayout;