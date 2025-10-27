// 이걸 왜써? 로그인 한 상태가 궁금해서 (매번 호출할 수 없으니까 전역으로 context 관리해서 뿌려줌) 그래서 필요함
// 1. 타입 지정 - boolean 
// 2. context 만들기 - useState 초기값 undefined
// 3. context Provider 만들기 children
// 4. ContextHook 만들기
// 5. Provider를 main.tsx에 App에 감싸주기

import { createContext, useState, useContext, type ReactNode } from "react";

interface ILoginContext {
    isLogined: boolean;
    setIsLogined: (value: boolean) => void;
}

export const LoginContext = createContext<ILoginContext | undefined>(
    undefined
);

export const LoginProvider = ({children}: {children: ReactNode}) => {
    const [isLogined, setIsLogined] = useState(false);
    
    return (
        <LoginContext.Provider value={{ isLogined, setIsLogined }}>
            {children}
        </LoginContext.Provider>
    );
}


