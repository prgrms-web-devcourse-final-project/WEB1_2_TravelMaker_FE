import { localStorageHelper } from "@common/utils/localStorageHelper";

const AUTH_STORAGE_KEY = "accessToken";

export interface AuthLocalStorage {
  accessToken: string;
}

export const AuthLocalStorageInitial: AuthLocalStorage = {
  accessToken: "",
};

/**
 * 사용자 인증 정보 유지 상태 스토리지
 */
export const authLocalStorage = localStorageHelper<AuthLocalStorage>(
  AUTH_STORAGE_KEY,
  AuthLocalStorageInitial
);
