import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import axios from "axios";

const SignupPage = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    const isValid = pwd.length >=6 && pwd === confirmPwd;

    const [nickname, setNickname] = useState("");

    const handleNext = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            setError("올바른 이메일을 입력해주세요");
            return;
        }
        setStep(2);
        setError("");
    }
    
    const handleSignup = () => {
        if (pwd.length < 6){
            setError("비밀번호는 최소 6자 이상이어야합니다.");
            return;
        }
        if(String(pwd)!== String(confirmPwd)){
            setError("비밀번호가 일치하지 않습니다.")
            return;
        }
        setError("");
        setStep(3);
    }

    const handleSignupFinal = () => {
        if (!nickname.trim()){
            setError("닉네임을 입력해주세요.");
            return;
        }
        try{
            axios.post("/api/signup", {
                email,
                password: pwd,
                nickname,
            });
            nav("/", {replace: true});
        } catch (err){
            setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            console.log(err)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="w-full max-w-sm p-6 rounded-lg">
                <div className="relative flex items-center mb-4">
                    <button
                        onClick={()=>nav(-1)}
                        className="mb-4 text-gray-200 text-3xl absolute left-0 cursor-pointer hover:text-[#434343]"
                    >{`<`}</button>
                    <h2 className="font-bold text-2xl text-center w-full mb-3">회원가입</h2>
                </div>
                
                {step === 1 && (
                    <>
                        <button className="relative w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border border-gray-300 rounded-md hover:bg-[#c3c3c3] hover:text-gray-950 cursor-pointer">
                            <img src="../public/google_logo.png" alt="구글 Logo" className="absolute left-4 w-5 h-5"/>구글 로그인
                        </button>
                        <div className="flex items-center gap-2 my-4">
                            <div className="flex-1 h-px bg-gray-300"/>
                            <span className="mx-8 text-sm text-gray-300">OR</span>
                            <div className="flex-1 h-px bg-gray-300"/>
                        </div>

                        <input 
                            placeholder="이메일을 입력해주세요"
                            type="email"
                            value={email}
                            className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <button 
                            onClick={handleNext}
                            className="w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer hover:bg-[#ff349a] hover:text-gray-300">
                            다음
                        </button>
                    </>  
                )}
                {step === 2 && (
                    <>
                        <p className="mb-2 text-gray-300">{email}</p>
                        <div className="w-full relative mb-3">
                            <input
                                placeholder="비밀번호를 입력해주세요"
                                type={showPwd? "text" : "password"}
                                value={pwd}
                                className="w-full p-2 pr-10 bg-[#161616] border border-gray-300 rounded-md"
                                onChange={(e)=> setPwd(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={()=>setShowPwd((prev) =>!prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            >
                                {showPwd? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        <div className="w-full relative mb-3">
                            <input
                                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                                type={showConfirmPwd? "text" : "password"}
                                value={confirmPwd}
                                className="w-full p-2 pr-10 bg-[#161616] border border-gray-300 rounded-md"
                                onChange={(e)=> setConfirmPwd(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={()=>setShowConfirmPwd((prev)=>!prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            >
                                {showConfirmPwd? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <button 
                            onClick={handleSignup}
                            className={`w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer
                                ${isValid 
                                    ? "bg-[#ff349a] text-gray-100 hover:opacity-90"
                                    : "bg-[#161616] text-[#919191] cursor-not-allowed"}`}
                            >
                            다음
                        </button>
                    </>
                )}
                {step === 3 && (
                    <>
                        <img 
                            src="./public/user_icon.png" 
                            className="mb-8 w-45 h-45 mx-auto"
                            alt="user icon"
                        />
                        <input
                            placeholder="닉네임을 입력해주세요"
                            type="text"
                            value={nickname}
                            className="w-full p-2 mb-3 bg-[#161616] border rounded-md"
                            onChange={(e)=>setNickname(e.target.value)}
                        /> 
                        <button 
                            onClick={handleSignupFinal}
                            className={`w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer
                                ${isValid 
                                    ? "bg-[#ff349a] text-gray-100 hover:opacity-90"
                                    : "bg-[#161616] text-[#919191] cursor-not-allowed"}`}
                            >
                            회원가입 완료
                        </button>
                    </>
                )}
                
            </div>

        </div>
    )
}

export default SignupPage;