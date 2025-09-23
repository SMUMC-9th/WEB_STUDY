import { useTheme } from "../context/ThemeContext";

const Tagname = ({tagname}:{tagname:string}) => {

    const {theme} = useTheme();
    return (
        <div>
            <span className={`rounded-lg p-0.5 text-center ${theme === "dark" ? "text-white" : ""}`}>{`#${tagname}`}</span>
        </div>
    )
    
}

export default Tagname;