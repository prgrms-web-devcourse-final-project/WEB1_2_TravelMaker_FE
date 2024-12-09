import { PropsWithChildren, useMemo, useState } from "react";

import { authLocalStorage, AuthLocalStorage, AuthLocalStorageInitial } from "@api/authLocalStorage";
import { setDefaultsHeaderAuth } from "@api/fetch";
import { AuthCallbackFn, AuthContext, LoginResponse } from "./AuthContext";

/**
 * 사용자 로그인 정보 상태 컨텍스트 프로바이더
 */
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState(authLocalStorage.get()?.accessToken || "");

  const login = ({ payload }: LoginResponse, { onSuccess, onFailure }: AuthCallbackFn) => {
    if (saveAuthData(payload)) {
      setAccessToken(payload?.accessToken || "");

      return onSuccess && onSuccess();
    }

    return onFailure && onFailure();
  };

  const logout = ({ onSuccess, onFailure }: AuthCallbackFn) => {
    if (removeAuthData()) {
      setAccessToken("");

      return onSuccess && onSuccess();
    }

    return onFailure && onFailure();
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      accessToken,
    }),
    [accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * 요청 헤더와 스토리지에 사용자 로그인 정보를 저장한다.
 *
 * @returns 작업이후 성공 여부에 따라 true/false를 반환.
 */
const saveAuthData = (data: AuthLocalStorage | undefined) => {
  const { accessToken } = data || AuthLocalStorageInitial;

  if (accessToken) {
    setDefaultsHeaderAuth(accessToken);
    authLocalStorage.set({ accessToken });

    return true;
  }

  return false;
};

/**
 * 요청 헤더와 스토리지에 사용자 로그인 정보를 삭제한다.
 *
 * @returns 작업이후 성공 여부에 따라 true/false를 반환.
 */
const removeAuthData = () => {
  try {
    setDefaultsHeaderAuth("");
    authLocalStorage.remove();

    return true;
  } catch {
    return false;
  }
};

saveAuthData(authLocalStorage.get());
