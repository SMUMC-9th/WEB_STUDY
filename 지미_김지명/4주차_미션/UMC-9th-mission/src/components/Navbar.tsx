import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

    return (
      <div className="flex flex-row items-center justify-between w-full h-20 px-8 bg-gray-900">
        <div
          onClick={() => navigate('/')}
          className="text-[#FF007F] text-xl font-bold hover:cursor-pointer">
          돌려돌려 LP판
        </div>
        <div className="flex flex-row gap-3">
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-black text-white border border-white rounded-md hover:bg-gray-900 transition cursor-pointer">
            로그인
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-4 py-2 bg-[#FF007F] text-white rounded-md hover:bg-pink-600 transition cursor-pointer">
            회원가입
          </button>
        </div>
      </div>
    );
  }
  