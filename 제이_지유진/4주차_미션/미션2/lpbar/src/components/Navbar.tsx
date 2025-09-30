import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-full flex p-4 justify-between items-center bg-neutral-800 text-center z-50 shadow-md">
      <Link to="/">
        <h1 className="text-3xl text-pink-500 font-bold">돌려돌려 LP판</h1>
      </Link>
      <div className="flex gap-2 text-white">
        <button
          className="bg-black py-1 rounded-[10px] w-[80px] hover:bg-black/50"
          onClick={() => navigate("/")}
        >
          로그인
        </button>
        <button
          className="bg-pink-500 py-1 rounded-[10px] w-[80px] hover:bg-pink-400"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
