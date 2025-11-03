import { useNavigate } from "react-router-dom";

interface SidebarContentProps {
    onClose ? : () => void;
}

export const SidebarContent = ({onClose}: SidebarContentProps) => {
    const nav = useNavigate();

    const handleNevigate = (path: string) => {
        nav(path);
        onClose?.();   //모바일에서만 함수전달함. 클릭하면 사이드바 닫을수 잇도록 함
    }

    return (
        <div className="flex flex-col p-6 w-60 bg-black text-white h-full">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={()=> {handleNevigate('./search')}}
                className="text-gray-300 hover:text-white hover:bg-gray-800 p-3 rounded-md text-lg text-left"
              >
                🔎 찾기
              </button>
              <button
                onClick={()=> {handleNevigate('./mypage')}}
                className="text-gray-300 hover:text-white hover:bg-gray-800 p-3 rounded-md text-lg text-left"
              >
                🤍 마이페이지
              </button>
            </nav>
        </div>
    )
}