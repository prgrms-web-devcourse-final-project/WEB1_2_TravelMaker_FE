import React, { useState, useRef } from "react";
import styled from "styled-components";
import DefaultImage from "../assets/images/DefaultImage.svg";
import CameraIcon from "../assets/icons/CameraIcon.svg";
import EditIcon from "../assets/icons/EditIcon.svg";
interface ProfileWithInfoProps {
  src?: string;
  name: string;
  email: string;
  onCameraClick?: (file: File) => void;
}

const ProfileWithInfo: React.FC<ProfileWithInfoProps> = ({ src, name, email, onCameraClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [profileImage, setProfileImage] = useState<string | null | undefined>(src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 8) {
      setCurrentName(inputValue);
    }
  };

  const handleConfirmClick = () => {
    setIsEditing(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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
              <img src={DefaultImage} alt="Default" />
            </DefaultBackground>
          )}
          <HoverText onClick={handleResetToDefault}>기본 프로필 이미지로 변경</HoverText>
        </ProfileImageWrapper>
        <CameraIconWrapper onClick={handleFileUpload}>
          <img src={CameraIcon} alt="CameraIcon" />
        </CameraIconWrapper>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
                <img src={EditIcon} alt="EditIcon" />
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
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 1550px) {
    width: 180px;
    height: 180px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
    margin-bottom: 10px;
  }
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

  img {
    width: 280px;
    height: auto;
    object-fit: contain;

    @media (max-width: 1550px) {
      max-width: 150px;
    }

    @media (max-width: 768px) {
      max-width: 130px;
    }
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  object-fit: cover;

  @media (max-width: 1550px) {
    max-width: 150px;
  }

  @media (max-width: 768px) {
    max-width: 120px;
  }
`;

const DefaultBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1550px) {
    max-width: 150px;
  }

  @media (max-width: 768px) {
    max-width: 120px;
  }
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

  @media (max-width: 1550px) {
    font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
  }
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

  @media (max-width: 1550px) {
    max-width: 50px;
    max-height: 50px;
  }

  @media (max-width: 768px) {
    max-width: 40px;
    max-height: 40px;
  }

  img {
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

  @media (max-width: 1550px) {
    max-width: 280px;
    max-height: 80px;
  }

  @media (max-width: 768px) {
    max-width: 280px;
    max-height: 60px;
    margin-top: 30px;
  }
`;

const UserNameWrapper = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;

  @media (max-width: 1550px) {
    max-height: 34px;
  }

  @media (max-width: 768px) {
    max-height: 14px;
  }
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

  @media (max-width: 1550px) {
    max-height: 34px;
    font-size: 28px;
  }

  @media (max-width: 768px) {
    max-height: 14px;
    font-size: 20px;
  }
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

  @media (max-width: 1550px) {
    font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.heading.h4.fontSize};
  }
`;

const UserName = styled.div`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.heading.h1.fontWeight};
  color: ${({ theme }) => theme.colors.text.body};

  @media (max-width: 1550px) {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const EditIconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 1550px) {
    max-width: 24px;
    max-height: 24px;
  }

  @media (max-width: 768px) {
    max-width: 18px;
    max-height: 18px;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const Email = styled.div`
  width: 280px;
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  color: ${({ theme }) => theme.colors.text.body};

  @media (max-width: 1550px) {
    font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  }
`;

export default ProfileWithInfo;
