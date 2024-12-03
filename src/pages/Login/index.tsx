import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "@components/button/Button";
import Google from "@components/assets/icons/GoogleIcon";
import Kakao from "@components/assets/icons/KakaoIcon";
import LargeLogo from "@components/assets/images/LargeLogo"; // LargeLogo 컴포넌트 경로
import { useLocation } from "react-router-dom";
import { sendAuthorizationCode } from "@pages/Login/LoginApi";

const Login: React.FC = () => {
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authorizationCode = params.get("code");
    const provider = location.pathname.includes("google") ? "google" : "kakao";

    if (authorizationCode) {
      sendAuthorizationCode(authorizationCode, provider);
    }
  }, [location]);

  const handleLogin = (provider: "google" | "kakao") => {
    if (provider === "google") {
      window.location.href =
        "http://wayfarer-develop-env.eba-s3bm7efv.ap-northeast-2.elasticbeanstalk.com/auth/login/google";
    } else if (provider === "kakao") {
      window.location.href =
        "https://kauth.kakao.com/oauth/authorize?client_id=ecf4fa7ba5b7c3dd0aecf41e4f30163c&redirect_uri=http://wayfarer-develop-env.eba-s3bm7efv.ap-northeast-2.elasticbeanstalk.com/auth/kakao/callback&response_type=code";
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
