import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "@components/button/Button";
import Google from "@components/assets/icons/GoogleIcon";
import Kakao from "@components/assets/icons/KakaoIcon";
import LargeLogo from "@components/assets/images/LargeLogo"; // LargeLogo 컴포넌트 경로
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "@api/fetch";
import { setDefaultsHeaderAuth } from "@api/fetch";

const saveAuthData = (data: { accessToken?: string }) => {
  const { accessToken } = data || {};

  if (accessToken) {
    // Axios 기본 헤더에 토큰 추가
    setDefaultsHeaderAuth(accessToken);
    // 로컬 스토리지에 토큰 저장
    localStorage.setItem("accessToken", accessToken);

    return true;
  }

  return false;
};

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 Authorization Code를 추출
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      // saveAuthData 함수 호출
      if (saveAuthData({ accessToken })) {
        // 리다이렉트로 URL 클리어 (토큰 노출 방지)
        window.history.replaceState({}, document.title, "/");
        navigate("/"); // 메인 페이지로 이동
      }
    }
  }, [location, navigate]);

  /**
   * 로그인 버튼 클릭 시 호출
   * 사용자를 Google 또는 Kakao 인증 페이지로 리다이렉트
   * @param provider - "google" 또는 "kakao" (로그인 제공자)
   */
  const handleLogin = (provider: "google" | "kakao") => {
    const redirectUri = `${baseURL}/auth/${provider}/callback`; // 리디렉션 URI 설정

    const authUrls = {
      google: `${baseURL}/auth/login/google?redirect_uri=${redirectUri}`,
      kakao: `https://kauth.kakao.com/oauth/authorize?client_id=ecf4fa7ba5b7c3dd0aecf41e4f30163c&redirect_uri=${redirectUri}&response_type=code`,
    };

    // 제공자에 맞는 인증 URL로 리다이렉트
    window.location.href = authUrls[provider];
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

// 스타일링
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin-bottom: 40px; /* 로고 아래 간격 */
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  gap: 40px;
`;
