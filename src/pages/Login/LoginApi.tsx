import axios from "axios";

export const sendAuthorizationCode = async (
  authorizationCode: string,
  provider: "google" | "kakao"
) => {
  try {
    await axios.post(`/auth/login/${provider}`, {
      authorizationCode,
    });
  } catch {
    // console.error("로그인 실패");
  }
};
