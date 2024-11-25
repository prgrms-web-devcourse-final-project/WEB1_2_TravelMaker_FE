import React, { useState } from "react";
import styled from "styled-components";
import Profile from "../assets/images/DefaultImage";
import CameraIcon from "../assets/icons/CameraIcon";
import EditIcon from "../assets/icons/EditIcon";

export const ProfileWithInfo: React.FC<{
  src?: string;
  name: string;
  email: string;
  onCameraClick?: (file: File) => void;
}> = ({ src, name, email, onCameraClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [profileImage, setProfileImage] = useState<string | null | undefined>(src);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };

  const handleConfirmClick = () => {
    setIsEditing(false);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.click();

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const imageUrl = reader.result as string;

          setProfileImage(imageUrl);
          onCameraClick?.(file);
        };

        reader.readAsDataURL(file);
      }
    };
  };

  const handleResetToDefault = () => {
    setProfileImage(null);
  };

  return (
    <Container>
      <ProfileWrapper>
        <ProfileImageWrapper>
          {profileImage ? (
            <ProfileImage src={profileImage} alt="Profile" />
          ) : (
            <DefaultBackground>
              <Profile />
            </DefaultBackground>
          )}
          <HoverText onClick={handleResetToDefault}>기본 프로필 이미지로 변경</HoverText>
        </ProfileImageWrapper>
        <CameraIconWrapper onClick={handleFileUpload}>
          <CameraIcon />
        </CameraIconWrapper>
      </ProfileWrapper>
      <InfoWrapper>
        <UserNameWrapper>
          {isEditing ? (
            <InputWrapper>
              <Input value={currentName} onChange={handleNameChange} autoFocus />
              <ConfirmButton onClick={handleConfirmClick}>확인</ConfirmButton>
            </InputWrapper>
          ) : (
            <>
              <UserName>{currentName}</UserName>
              <EditIconWrapper onClick={handleEditClick}>
                <EditIcon />
              </EditIconWrapper>
            </>
          )}
        </UserNameWrapper>
        <Email>{email}</Email>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.neutral3};
`;

const ProfileWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: ${({ theme }) => theme.strokeWidth.thick} solid
    ${({ theme }) => theme.colors.stroke.neutral3};
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover span {
    opacity: 1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  object-fit: cover;
`;

const DefaultBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HoverText = styled.span`
  position: absolute;
  bottom: 35%;
  background-color: ${({ theme }) => theme.colors.background.neutral1};
  color: ${({ theme }) => theme.colors.text.body};
  font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const InfoWrapper = styled.div`
  width: 280px;
  min-height: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserNameWrapper = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.heading.h1.fontWeight};
  text-align: center;
  border: none;
  border-bottom: ${({ theme }) => theme.strokeWidth.thick} solid
    ${({ theme }) => theme.colors.stroke.neutral3};
  outline: none;
`;

const ConfirmButton = styled.button`
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  background-color: ${({ theme }) => theme.colors.text.body};
  color: ${({ theme }) => theme.colors.background.neutral0};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.title};
    transform: scale(1.01);
  }
`;

const UserName = styled.div`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.heading.h1.fontWeight};
  color: ${({ theme }) => theme.colors.text.body};
`;

const EditIconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Email = styled.div`
  width: 280px;
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
`;
