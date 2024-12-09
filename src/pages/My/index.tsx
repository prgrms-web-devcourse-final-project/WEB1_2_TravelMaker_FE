import { useState, useEffect } from "react";
import styled from "styled-components";

import { calcResponsiveByPercent } from "@common/styles/theme";
import ProfileWithInfo from "@components/profile/Profile";
import Button from "@components/button/Button";
import {
  fetchUserProfile,
  deleteUserAccount,
  updateNickname,
  updateProfileImage,
  UserProfile,
} from "@api/my/member";
import { useAuth } from "@common/hooks/useAuth";
import { useTypedNavigate } from "@common/hooks/useTypedNavigate";

const My = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { logout } = useAuth();
  const navigate = useTypedNavigate();

  const getUserProfile = async () => {
    try {
      const data = await fetchUserProfile();

      setProfile(data);
    } catch {
      alert("사용자 정보를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleCameraClick = async (file: File) => {
    try {
      const updatedProfile = await updateProfileImage(file);

      setProfile(updatedProfile);
      alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
    } catch {
      alert("프로필 이미지 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleNameChange = async (newName: string) => {
    if (!profile) return;

    try {
      const updatedNickname = await updateNickname(newName);

      setProfile((prev) => (prev ? { ...prev, nickname: updatedNickname } : prev));

      alert("닉네임이 성공적으로 변경되었습니다.");
    } catch {
      alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLogout = () => {
    logout({
      onSuccess: () => {
        alert("로그아웃이 완료되었습니다.");
        navigate("/landing", undefined, { replace: true });
      },
    });
  };

  const handleWithdraw = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await deleteUserAccount();
        alert("회원탈퇴가 완료되었습니다.");
        setProfile(null);
        navigate("/landing", undefined, { replace: true });
      } catch {
        alert("회원탈퇴에 실패했습니다.");
      }
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <ProfileWithInfo
          src={profile?.profileImage || undefined}
          name={profile?.nickname || "닉네임 없음"}
          email={profile?.email || "이메일 없음"}
          onCameraClick={handleCameraClick}
          onNameChange={handleNameChange}
        />
        <ButtonWrapper>
          <Button label="로그아웃" onClick={handleLogout} type="medium" />
          <Button label="회원탈퇴" onClick={handleWithdraw} type="medium" />
        </ButtonWrapper>
      </ContentWrapper>
    </PageContainer>
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
