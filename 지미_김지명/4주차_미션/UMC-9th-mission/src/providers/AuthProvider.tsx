// import { AuthContext } from "../context/AuthContext";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { LOCAL_STORAGE_KEY } from "../constants/key";
// import { PropsWithChildren, useState } from "react";
// import { RequestSigninDto } from "../types/auth";
// import { postLogout, postSignin } from "../api/auth";

// export const AuthProvider = ({ children }: PropsWithChildren) => {
//   const {
//     getItem: getAccessTokenFromStorage,
//     setItem: setAccessTokenInStorage,
//     removeItem: removeAccessTokenFromStorage,
//   } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

//   const {
//     getItem: getRefreshTokenFromStorage,
//     setItem: setRefreshTokenInStorage,
//     removeItem: removeRefreshTokenFromStorage,
//   } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

//   const [accessToken, setAccessToken] = useState<string | null>(
//     getAccessTokenFromStorage()
//   );

//   const [refreshToken, setRefreshToken] = useState<string | null>(
//     getRefreshTokenFromStorage()
//   );

//   const login = async (signinData: RequestSigninDto): Promise<boolean> => {
//     try {
//       const { data } = await postSignin(signinData);

//       if (data) {
//         const newAccessToken: string = data.accessToken;
//         const newRefreshToken: string = data.refreshToken;

//         setAccessTokenInStorage(newAccessToken);
//         setRefreshTokenInStorage(newRefreshToken);

//         setAccessToken(newAccessToken);
//         setRefreshToken(newRefreshToken);

//         alert("로그인 성공");
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error("로그인 오류", error);
//       alert("로그인 실패");
//       return false;
//     }
//   };

//   const logout = async (): Promise<boolean> => {
//     try {
//       await postLogout();
//       removeAccessTokenFromStorage();
//       removeRefreshTokenFromStorage();

//       setAccessToken(null);
//       setRefreshToken(null);

//       alert("로그아웃 성공");
//       return true;
//     } catch (error) {
//       console.error("로그아웃 오류", error);
//       alert("로그아웃 실패");
//       return false;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         accessToken,
//         refreshToken,
//         setAccessToken,
//         setRefreshToken,
//         login,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
