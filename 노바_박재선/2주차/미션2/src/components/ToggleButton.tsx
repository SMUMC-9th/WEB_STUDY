import { useTheme } from "../context/ThemeContext";


export default function ToggleButton() {
    const {theme, toggleTheme} = useTheme();

    return (
        <button onClick={toggleTheme} className={`rounded-lg px-2 py-1 ${theme === "dark" ? "text-white" : ""}`}>버튼</button>
    )
}