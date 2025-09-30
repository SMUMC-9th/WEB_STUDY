import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-[#161616] text-white">
            <Link to="/" className="text-[#ff349a] font-bold text-xl">
                돌려돌려LP판
            </Link>
            <div className="flex gap-3">
                <Link to="/login" className="bg-black rounded-md px-4 py-2 hover:bg-[#2e2e2e]">로그인</Link>
                <Link to="/signup" className="bg-[#ff349a] rounded-md px-4 py-2 hover:bg-pink-800">회원가입</Link>
            </div>
        </nav>
    )
}

export default Navbar;