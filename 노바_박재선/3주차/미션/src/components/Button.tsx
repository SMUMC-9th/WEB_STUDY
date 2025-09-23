import React from "react";

type ButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}


const Button:React.FC<ButtonProps> = ({text, onClick, disabled=false}) => {
    const baseStyle = 
        "cursor-pointer border-none rounded-md px-5 py-2 text-base font-sans whitespace-nowrap flex justify-center items-center text-center transition-all duration-200";
        
    const colorStyle = disabled 
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : "bg-[#6dafff] text-white hover:bg-[#92fff9]";
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${colorStyle}`}>{text}</button>
    )
}

export default Button;
