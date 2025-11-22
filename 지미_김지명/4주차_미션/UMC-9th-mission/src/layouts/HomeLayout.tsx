import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet/>
            </main>
            <Footer />
        </div> 
      )
}

export default HomeLayout
