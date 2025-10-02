// import { FcGoogle } from "react-icons/fc";
//
//
// export default function EmailStep() {
//   const handleGoogleLogin = () => {
//     window.location.href = `${
//       import.meta.env.VITE_SERVER_API_URL
//     }/v1/auth/google/login`;
//   };
//
//   return (
//     <>
//       <div className="flex flex-col justify-center items-center">
//         <div className="w-full relative">
//           <button
//             onClick={handleGoogleLogin}
//             className="flex justify-center items-center w-full text-[black] border border-[black] rounded-xl px-6 py-2 mb-4 hover:bg-[#e14d36] transition-colors cursor-pointer "
//           >
//             <FcGoogle size={20} className="absolute left-4"/>
//             Google Login
//           </button>
//         </div>
//       </div>
//
//       <div className="flex flex-col">
//         <p className="text-[black] mb-4">───────── or ─────────</p>
//
//         <input
//           {...register("email")}
//           type={"email"}
//           className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80`}
//           placeholder="이메일을 입력해주세요."
//           autoComplete="off" // 자동완성 안뜨게
//         />
//
//         {errors.email && (
//           <div className="text-red-500 text-sm mb-2">
//             {errors.email.message}
//           </div>
//         )}
//     </>
//   );
// }
//
//
