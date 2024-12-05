import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "@components/button/Button";
import Google from "@components/assets/icons/GoogleIcon";
import Kakao from "@components/assets/icons/KakaoIcon";
import LargeLogo from "@components/assets/images/LargeLogo"; // LargeLogo 컴포넌트 경로
import { useLocation } from "react-router-dom";
import { sendAuthorizationCode } from "@pages/Login/LoginApi";
import { useToken } from "../../common/hooks/useToken";
import { setupAxiosInterceptors } from "./setupAxiosInterceptors"; // 인터셉터 설정 함수
import { baseURL } from "@api/fetch";

const Login: React.FC = () => {
  const location = useLocation(); // 현재 경로 및 쿼리 문자열 정보를 얻기 위한 hook
  const { setToken } = useToken(); // 토큰 상태 관리 함수 가져오기

  useEffect(() => {
    // Axios 응답 인터셉터를 초기화하여 토큰 갱신 처리
    setupAxiosInterceptors(setToken);

    // 현재 URL에서 Authorization Code를 추출
    const params = new URLSearchParams(location.search); // 쿼리 문자열 파싱
    const authorizationCode = params.get("code"); // "code" 파라미터 값 가져오기
    const provider = location.pathname.includes("google") ? "google" : "kakao"; // 경로를 기반으로 로그인 제공자 결정

    // Authorization Code가 있는 경우 서버로 전송
    if (authorizationCode) {
      sendAuthorizationCode(authorizationCode, provider, setToken);
    }
  }, [location, setToken]);

  /**
   * 로그인 버튼 클릭 시 호출
   * 사용자를 Google 또는 Kakao 인증 페이지로 리다이렉트합니다.
   * @param provider - "google" 또는 "kakao" (로그인 제공자)
   */
  const handleLogin = (provider: "google" | "kakao") => {
    const redirectUri = `${baseURL}/auth/${provider}/callback`; // 리디렉션 URI 설정

    if (provider === "google") {
      // Google 인증 URL로 리다이렉트
      window.location.href = `${baseURL}/auth/login/google?redirect_uri=${redirectUri}`;
    } else if (provider === "kakao") {
      // Kakao 인증 URL로 리다이렉트
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=ecf4fa7ba5b7c3dd0aecf41e4f30163c&redirect_uri=${redirectUri}&response_type=code`;
    }
  };

  return (
    <LoginPageWrapper>
      <LoginDiv>
        <LogoWrapper>
          <LargeLogo width={300} height={320} /> {/* SVG 컴포넌트 사용 */}
        </LogoWrapper>
        <ButtonWrapper>
          <Button label="Google로 시작하기" icon={Google} onClick={() => handleLogin("google")} />
          <Button label="Kakao로 시작하기" icon={Kakao} onClick={() => handleLogin("kakao")} />
        </ButtonWrapper>
      </LoginDiv>
    </LoginPageWrapper>
  );
};

export default Login;

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
`;

const LoginDiv = styled.div`
  width: 500px;
  height: 650px;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 40px; /* 로고 아래 간격 */
  margin-left: 100px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
  gap: 40px;
`;
