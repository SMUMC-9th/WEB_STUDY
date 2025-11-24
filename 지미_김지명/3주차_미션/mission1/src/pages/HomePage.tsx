import { Outlet } from "react-router-dom"
import { Navbar } from "../components/common/Navbar"

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default HomePage