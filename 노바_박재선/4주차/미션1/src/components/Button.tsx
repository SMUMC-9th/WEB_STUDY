import React from "react";

type ButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}


const Button:React.FC<ButtonProps> = ({text, onClick, disabled=false}) => {
    const baseStyle = 
        "cursor-pointer border-none rounded-md px-5 py-2 text-lg font-sans whitespace-nowrap flex justify-center items-center text-center transition-all duration-200";
        
    const colorStyle = disabled 
    ? "bg-[#595959] text-gray-400 cursor-not-allowed"
    : "bg-[#6dafff] text-[#f7f7f7] hover:bg-[#173d6b]";
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${colorStyle}`}>{text}</button>
    )
}

export default Button;
