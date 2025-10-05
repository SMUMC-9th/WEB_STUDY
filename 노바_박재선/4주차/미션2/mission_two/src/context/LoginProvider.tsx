// 1. 타입지정 ->boolean
// 2. context 만들고
// 3. context.provider 만들고
// 4. context hook   useContext훅 만들서 쉽게 불러오기
// App.tsx에 context.provider 감싸주기
// useState 안에 set

// import { createContext, useState, type ReactNode } from "react";

// interface LoginContextType {
//     login: boolean;
//     isLogined : () => void;

// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const LoginContext = createContext<LoginContextType | undefined>(
//     undefined
// );

// export const LoginProvider = ({children}:{children:ReactNode}) => {
//     const [login, setLogin] = useState(false);
//     const isLogined = () => setLogin((prev)=>true);

//     return (
//         <LoginContext.Provider
//             value={{login, isLogined}}>
//             {children}
//         </LoginContext.Provider>
//     )
// }