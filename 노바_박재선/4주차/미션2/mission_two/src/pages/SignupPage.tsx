// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import useForm from "../hooks/useForm";
// import { signupSchema, type SignupForm } from "../schemas/signupSchema";

// const SignupPage = () => {
//   const nav = useNavigate();
//   const [step, setStep] = useState(1);
//   const [showPwd, setShowPwd] = useState(false);
//   const [showConfirmPwd, setShowConfirmPwd] = useState(false);

//   const { values, errors, getInputProps, handleSubmit, setErrors, validate } = useForm<SignupForm>({
//     initialValue: { email: "", password: "", confirmPwd: "", nickname: "" },
//     validate: (values) => {
//       const errors: Record<keyof SignupForm, string> = {
//         email: "",
//         password: "",
//         confirmPwd: "",
//         nickname: "",
//       };

//       // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (step === 1){
//         const emailCheck = signupSchema.pick({email: true}).safeParse({email:values.email});
//         if(!emailCheck.success) {
//           errors.email = emailCheck.error.issues[0].message;
//         }
//       }
//       if (step === 2){
//         const pwdCheck = signupSchema.pick({password: true}).safeParse({password:values.password});
//         if(!pwdCheck.success) {
//           errors.password = pwdCheck.error.issues[0].message;
//         }
//         else if (values.password !== values.confirmPwd){
//           errors.confirmPwd = "비밀번호가 일치하지 않습니다"
//         }
//       }
      
//       if (step === 3){
//         const nickCheck = signupSchema.pick({nickname: true}).safeParse({nickname: values.nickname});
//         if(!nickCheck.success){
//           errors.nickname = nickCheck.error.issues[0].message;
//         }
//       }

//       return errors;
//     },
//     onSubmit: (values) => {
//       console.log("회원가입 완료", values);
//       nav("/");
//     },
//   });

//   const handleNextFromStep1 = () => {
//     const errs = validate(values);
//     setErrors(errs);
//     if(!errs.email){
//       setStep(2);
//     }
//   }
//   const handleNextFromStep2 = () => {
//     const errs = validate(values);
//     setErrors(errs);
//     if(!errs.password && !errs.confirmPwd){
//       setStep(3);
//     }
//   }

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen">
//       <div className="w-full max-w-sm p-6 rounded-lg">
//         <div className="relative flex items-center mb-4">
//           <button
//             onClick={() => nav(-1)}
//             className="mb-4 text-gray-200 text-3xl absolute left-0 cursor-pointer hover:text-[#434343]"
//           >
//             {`<`}
//           </button>
//           <h2 className="font-bold text-2xl text-center w-full mb-3">회원가입</h2>
//         </div>

//         {step === 1 && (
//           <>
//             <button className="relative w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border border-gray-300 rounded-md hover:bg-[#c3c3c3] hover:text-gray-950 cursor-pointer">
//               <img
//                 src="../public/google_logo.png"
//                 alt="구글 Logo"
//                 className="absolute left-4 w-5 h-5"
//               />
//               구글 로그인
//             </button>
//             <div className="flex items-center gap-2 my-4">
//               <div className="flex-1 h-px bg-gray-300" />
//               <span className="mx-8 text-sm text-gray-300">OR</span>
//               <div className="flex-1 h-px bg-gray-300" />
//             </div>

//             <input
//               placeholder="이메일을 입력해주세요"
//               type="text"
//               className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
//               {...getInputProps("email")}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mb-2">{errors.email}</p>
//             )}

//             <button
//               onClick={handleNextFromStep1}
//               className="w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer hover:bg-[#ff349a] hover:text-gray-300"
//             >
//               다음
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <p className="mb-2 text-gray-300">{values.email}</p>
//             <div className="w-full relative mb-3">
//               <input
//                 placeholder="비밀번호를 입력해주세요"
//                 type={showPwd ? "text" : "password"}
//                 className="w-full p-2 pr-10 bg-[#161616] border border-gray-300 rounded-md"
//                 {...getInputProps("password")}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPwd((prev) => !prev)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
//               >
//                 {showPwd ? <Eye size={20} /> : <EyeOff size={20} />}
//               </button>
//             </div>
//             <div className="w-full relative mb-3">
//               <input
//                 placeholder="비밀번호를 다시 한 번 입력해주세요!"
//                 type={showConfirmPwd ? "text" : "password"}
//                 className="w-full p-2 pr-10 bg-[#161616] border border-gray-300 rounded-md"
//                 {...getInputProps("confirmPwd")}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPwd((prev) => !prev)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
//               >
//                 {showConfirmPwd ? <Eye size={20} /> : <EyeOff size={20} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mb-2">{errors.password}</p>
//             )}
//             {errors.confirmPwd && (
//               <p className="text-red-500 text-sm mb-2">{errors.confirmPwd}</p>
//             )}

//             <button
//               onClick={handleNextFromStep2}
//               className="w-full rounded-md bg-[#ff349a] text-gray-100 p-2 mt-1 hover:opacity-90"
//             >
//               다음
//             </button>
//           </>
//         )}

//         {step === 3 && (
//           <form onSubmit={handleSubmit}>
//             <img
//               src="./public/user_icon.png"
//               className="mb-8 w-45 h-45 mx-auto"
//               alt="user icon"
//             />
//             <input
//               placeholder="닉네임을 입력해주세요"
//               type="text"
//               className="w-full p-2 mb-3 bg-[#161616] border rounded-md"
//               {...getInputProps("nickname")}
//             />
//             {errors.nickname && (
//               <p className="text-red-500 text-sm mb-2">{errors.nickname}</p>
//             )}

//             <button
//               type="submit"
//               className="w-full rounded-md bg-[#ff349a] text-gray-100 p-2 mt-1 hover:opacity-90"
//             >
//               회원가입 완료
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignupPage;









//강의 수강
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {z} from "zod";
import { Eye, EyeOff } from "lucide-react";
import { postSignup } from "../apis/auth";
import type { ResponseSignupDto } from "../types/auth";

const signupSchema = z
  .object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
    password: z.string().min(6, {message: "비밀번호는 최소 6자 이상이어야 합니다."}),
    confirmPwd: z.string(),
    nickname: z.string().min(2, {message: "닉네임은 두글자 이상이어야합니다."}),
  })
  .superRefine((data, ctx) => {
    if (data.password.length >= 6 && data.password !== data.confirmPwd){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPwd"],
      })
    }
  })
  // .refine((data) => data.password === data.confirmPwd, {
  //   message: "비밀번호가 일치하지 않습니다.",
  //   path: ["confirmPwd"],
  // });

type FormFields = z.infer<typeof signupSchema>;



const SignupPage = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [showPwd,setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const {
    register, 
    handleSubmit, 
    trigger,
    formState: {errors, isSubmitting},
    getValues,
  } = useForm<FormFields>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPwd : "",
      nickname: "",
    },
  });

  const handleNextFromStep1 = async () => {
    const valid = await trigger("email");
      if(valid) setStep(2);
  }
  const handleNextFromStep2 = async () => {
    const valid = await trigger(["password", "confirmPwd"]);
      if(valid) setStep(3);
  }
  const onSubmit:SubmitHandler<FormFields> = async(data) => {
    const {confirmPwd, nickname, ...rest} = data;

    const requestBody = {
      ...rest,
      name: nickname,
    }
    const response:ResponseSignupDto = await postSignup(requestBody);
    console.log(response);
    nav("/",{replace: true});
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-6 rounded-lg">
        <div className="relative flex items-center mb-4">
          <button
            onClick={() => nav(-1)}
            className="mb-4 text-gray-200 text-3xl absolute left-0 cursor-pointer hover:text-[#434343]"
          >
            {`<`}
          </button>
          <h2 className="font-bold text-2xl text-center w-full mb-3">회원가입</h2>
        </div>
        {step === 1 && (
          <>
            <button className="relative w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 border border-gray-300 rounded-md hover:bg-[#c3c3c3] hover:text-gray-950 cursor-pointer">
              <img
                src="../public/google_logo.png"
                alt="구글 Logo"
                className="absolute left-4 w-5 h-5"
              />
              구글 로그인
            </button>
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="mx-8 text-sm text-gray-300">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <input
              placeholder="이메일을 입력해주세요"
              type="email"
              className="w-full p-2 mb-3 bg-[#161616] border border-gray-300 rounded-md"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
            )}

            <button
              onClick={handleNextFromStep1}
              className="w-full rounded-md bg-[#161616] p-2 mt-1 text-[#919191] cursor-pointer hover:bg-[#ff349a] hover:text-gray-300"
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-2 text-gray-300">{getValues("email")}</p>
            <div className="w-full relative mb-3">
              <input
                placeholder="비밀번호를 입력해주세요"
                type={showPwd ? "text" : "password"}
                className="w-full p-2 pr-10 bg-[#161616] border border-gray-300 rounded-md"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPwd((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPwd ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <div className="w-full relative mb-3">
              <input
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                type={showConfirmPwd ? "text" : "password"}
                className="w-full p-2 pr-10 bg-[#161616] border border-gray-300 rounded-md"
                {...register("confirmPwd")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPwd((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showConfirmPwd ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
            )}
            {errors.confirmPwd && (
              <p className="text-red-500 text-sm mb-2">{errors.confirmPwd.message}</p>
            )}

            <button
              onClick={handleNextFromStep2}
              className="w-full rounded-md bg-[#ff349a] text-gray-100 p-2 mt-1 hover:opacity-90"
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <img
              src="./public/user_icon.png"
              className="mb-8 w-45 h-45 mx-auto"
              alt="user icon"
            />
            <input
              placeholder="닉네임을 입력해주세요"
              type="text"
              className="w-full p-2 mb-3 bg-[#161616] border rounded-md"
              {...register("nickname")}
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mb-2">{errors.nickname?.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-[#ff349a] text-gray-100 p-2 mt-1 hover:opacity-90"
            >
              {isSubmitting ? "가입중,," : "회원가입 완료"}
            </button>
            
          </form>
        )}
      </div>
    </div>

  )
}

export default SignupPage