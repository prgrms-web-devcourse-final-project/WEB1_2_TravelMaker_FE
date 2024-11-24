import React from "react";
import styled from "styled-components";
import Button from "../../components/stories/Button";
import Google from "../../components/assets/Icon";
import Kakao from "../../components/assets/Icon1";

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9fafc;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #4c7aa7;
  margin-bottom: 40px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #4c7aa7;
  margin-bottom: 60px;
`;

const LoginPage: React.FC = () => {
  const handleLoginClick = () => {
    alert("로그인 버튼 클릭됨");
  };

  return (
    <LoginPageWrapper>
      <Title>로그인</Title>
      <Description>로그인을 통해 더 많은 기능을 사용할 수 있습니다.</Description>
      <Button
        label="로그인"
        icon={Google} // 아이콘 컴포넌트를 전달
        onClick={handleLoginClick}
      />
     <Button
        label="로그인"
        icon={Kakao} // 아이콘 컴포넌트를 전달
        onClick={handleLoginClick}
      />
    </LoginPageWrapper>
  );
};

export default LoginPage;