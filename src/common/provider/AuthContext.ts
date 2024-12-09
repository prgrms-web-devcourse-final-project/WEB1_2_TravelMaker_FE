import { createContext } from "react";

export interface LoginResponse {
  payload: {
    accessToken: string;
  };
}

export interface AuthCallbackFn {
  onSuccess: () => void;
  onFailure?: () => void;
}

interface AuthContextType {
  login: (response: LoginResponse, callback: AuthCallbackFn) => void;
  logout: (callback: AuthCallbackFn) => void;
  accessToken: string;
}

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  accessToken: "",
});
