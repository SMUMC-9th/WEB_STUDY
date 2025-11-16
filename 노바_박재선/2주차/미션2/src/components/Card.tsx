import { useTheme } from "../context/ThemeContext";
import Header from "./Header";
import Info from "./Info";
import ToggleButton from "./ToggleButton";


export default function Card() {
    const {theme} = useTheme();

    return (
        <div className={`flex w-[100vw] h-[100vh] justify-center items-center ${theme==="light" ? 'bg-white' : 'bg-[rgb(27,27,27)]'}`}>
            <div className={`flex flex-col w-[300px] h-[400px]  items-center rounded-2xl shadow-2xl pt-2 ${theme === "dark" ? "text-white" : ""} ${theme==="light" ? 'bg-white' : 'bg-[rgb(33,33,33)]'}`}>
                <Header/>
                <Info />
                <ToggleButton/>
            </div>
        </div>
        
    
    )
}