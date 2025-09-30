// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";


// const LoginPage = () => {
//     const nav = useNavigate();
//     const [email, setEmail] = useState("");
//     const [pwd, setPwd] = useState("");
//     const [error, setError] = useState("");
    
//     const validate = () => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if(!emailRegex.test(email)){
//             setError("올바른 이메일 형식을 입력해주세요");
//             return false;
//         };
//         if(pwd.length < 6){
//             setError("비밀번호는 최소 6자 이상이어야합니다.");
//             return false;
//         }
//         setError("");
//         return true;
//     }

//     const handleLogin = () => {
//         if (!validate()) return;

//         console.log("로그인 시도: ", {email, pwd});
//         nav("/");
//     }

//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen">
//             <div className="w-full max-w-sm p-6 rounded-lg">
//                 <div className="relative flex items-center mb-4">
//                     <button 
//                         onClick={()=>nav(-1)}
//                         className="mb-4 text-gray-200 text-3xl absolute left-0 cursor-pointer hover:text-[#434343]">{`<`}</button>
//                     <h2 className="font-bold text-2xl text-center w-full mb-3">로그인</h2>
//                 </div>
                
//                 <button className="relative w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border border-gray-300 rounded-md hover:bg-[#c3c3c3] hover:text-gray-950 cursor-pointer">
//                     <img src="../public/google_logo.png" alt="구글 Logo" className="absolute left-4 w-5 h-5"/>구글 로그인
//                 </button>

//                 <div className="flex items-center gap-2 my-4">
//                     <div className="flex-1 h-px bg-gray-300"/>
//                     <span className="mx-8 text-sm text-gray-300">OR</span>
//                     <div className="flex-1 h-px bg-gray-300"/>
//                 </div>

//                 <input 
//                     placeholder="이메일을 입력해주세요"
//                     type="email"
//                     value={email}
//                     className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
//                     onChange={(e)=> setEmail(e.target.value)}
//                 />
//                 <input
//                     placeholder="비밀번호를 입력해주세요"
//                     type="password"
//                     value={pwd}
//                     className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
//                     onChange={(e)=> setPwd(e.target.value)}
//                 />

//                 {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//                 <button 
//                     onClick={handleLogin}
//                     className="w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer hover:bg-[#ff349a] hover:text-gray-300">
//                     로그인
//                 </button>

//                 <p className="mt-4 text-center text-sm text-gray-400">
//                     아직 계정이 없으신가요? 
//                     <Link to="/signup" className="text-[#ff349a] hover:underline ml-2">
//                         회원가입
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default LoginPage;






import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";


interface FormValues {
    email: string;
    pwd: string;
}
interface FormErrors {
    email?: string;
    pwd?: string;
}


const validateLogin = (values:FormValues): FormErrors => {
    const errors:FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!values.email) {
        errors.email = "이메일을 입력해주세요";
    } else if (!emailRegex.test(values.email)){
        errors.email = "올바른 이메일 형식을 입력해주세요"
    }

    if(!values.pwd) {
        errors.pwd = "비밀번호를 입력해주세요";
    } else if (values.pwd.length < 6){
        errors.pwd = "비밀번호는 최소 6자 이상이어야 합니다."
    }
    return errors;
}


const LoginPage = () => {
    const nav = useNavigate();
    
    const {values, errors, handleChange, handleSubmit} = useForm({
        initialValues: {
            email: '',
            pwd: '',
        },
        onSubmit: (loginData) => {
            console.log("로그인 시도: ", loginData);
            nav('/');
        },
        validate: validateLogin,
    });

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="w-full max-w-sm p-6 rounded-lg">
                <div className="relative flex items-center mb-4">
                    <button 
                        onClick={()=>nav(-1)}
                        className="mb-4 text-gray-200 text-3xl absolute left-0 cursor-pointer hover:text-[#434343]">{`<`}</button>
                    <h2 className="font-bold text-2xl text-center w-full mb-3">로그인</h2>
                </div>
                
                <button className="relative w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border border-gray-300 rounded-md hover:bg-[#c3c3c3] hover:text-gray-950 cursor-pointer">
                    <img src="../public/google_logo.png" alt="구글 Logo" className="absolute left-4 w-5 h-5"/>구글 로그인
                </button>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-gray-300"/>
                    <span className="mx-8 text-sm text-gray-300">OR</span>
                    <div className="flex-1 h-px bg-gray-300"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="이메일을 입력해주세요"
                        type="email"
                        name="email"
                        value={values.email}
                        className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                    
                    <input
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        name="pwd"
                        value={values.pwd}
                        className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.pwd}</p>}

                    <button 
                        type="submit"
                        className="w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer hover:bg-[#ff349a] hover:text-gray-300">
                        로그인
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-400">
                    아직 계정이 없으신가요? 
                    <Link to="/signup" className="text-[#ff349a] hover:underline ml-2">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;




