export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
}

export interface SignUpResponse {
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
  };
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}
