// import { createContext, useContext } from "react";
// import { RequestSigninDto } from "../types/auth";

// interface AuthContextType {
//   accessToken: string | null;
//   setAccessToken: (token: string | null) => void;
//   refreshToken: string | null;
//   setRefreshToken: (token: string | null) => void;
//   login: (signinData: RequestSigninDto) => Promise<boolean>;
//   logout: () => Promise<boolean>;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
