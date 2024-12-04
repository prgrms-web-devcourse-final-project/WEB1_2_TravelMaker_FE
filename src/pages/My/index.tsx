import { useState } from "react";
import styled from "styled-components";
import { calcResponsiveByPercent } from "@common/styles/theme";
import Header from "@components/header/Header";
import ProfileWithInfo from "@components/profile/Profile";
import Button from "@components/button/Button";

const My = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleCameraClick = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result as string;

      setProfileImage(imageUrl);
    };

    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    alert("로그아웃이 완료되었습니다.");
  };

  const handleWithdraw = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      alert("회원탈퇴가 완료되었습니다.");
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <ContentWrapper>
          <ProfileWithInfo
            src={profileImage || undefined}
            name="김트메"
            email="travelmaker@gmail.com"
            onCameraClick={handleCameraClick}
          />
          <ButtonWrapper>
            <Button label="로그아웃" onClick={handleLogout} type="medium" />
            <Button label="회원탈퇴" onClick={handleWithdraw} type="medium" />
          </ButtonWrapper>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  gap: ${calcResponsiveByPercent(-15, 100)};

  @media (min-width: 1024px) {
    margin: 0;
    flex-direction: column;
    gap: ${calcResponsiveByPercent(-15, 250)};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  @media (max-width: 1550px) {
    margin-top: 0px;
  }

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  gap: 40px;

  @media (max-width: 1550px) {
    margin-top: 0px;
    gap: 30px;
  }

  @media (max-width: 768px) {
    margin-top: -10px;
    gap: 30px;
  }
`;

export default My;
