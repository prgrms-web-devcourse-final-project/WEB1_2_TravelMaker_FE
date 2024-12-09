import { useContext } from "react";

import { AuthContext } from "@common/provider/AuthContext";

/**
 * 로그인 상태 관리 훅
 *
 * `login` - 함수를 호출하면 로그인 정보를 브라우저에 저장합니다.
 *
 * `logout` - 함수를 호출하면 로그인 정보를 브라우저에서 삭제합니다.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
