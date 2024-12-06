import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CameraIcon from "../assets/icons/CameraIcon.svg";
import EditIcon from "../assets/icons/EditIcon.svg";
import { useUserContext } from "@pages/My/contexts/UserContext";

interface ProfileWithInfoProps {
  src?: string;
  name: string;
  email: string;
  onCameraClick?: (file: File) => void;
  onNameChange?: (newName: string) => void;
}

const ProfileWithInfo: React.FC<ProfileWithInfoProps> = ({
  src,
  name,
  email,
  onCameraClick,
  onNameChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { profileImage, setProfileImage } = useUserContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (src && profileImage !== src) {
      setProfileImage(src);
    }
  }, [src, profileImage, setProfileImage]);

  useEffect(() => {
    setCurrentName(name);
  }, [name]);

  const handleEditClick = () => {
    setIsEditing(true);
    setErrorMessage(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 8) {
      setCurrentName(inputValue);
      setErrorMessage(null);
    }
  };

  const handleConfirmClick = async () => {
    if (!currentName || currentName.trim().length === 0) {
      setErrorMessage("1자 이상 입력해주세요.");

      return;
    }

    try {
      setIsEditing(false);

      if (onNameChange) {
        await onNameChange(currentName);
      }
    } catch {
      alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        if (onCameraClick) {
          await onCameraClick(file);
          const imageUrl = URL.createObjectURL(file);

          setProfileImage(imageUrl);
        }
      } catch {
        alert("프로필 이미지 변경에 실패했습니다.");
      }
    }
  };

  return (
    <Container>
      <ProfileWrapper>
        <ProfileImageWrapper>
          {profileImage ? (
            <ProfileImage src={profileImage} alt="Profile" />
          ) : (
            <DefaultBackground>
              <span>이미지 없음</span>
            </DefaultBackground>
          )}
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
    width: 100%;
    object-fit: cover;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  object-fit: cover;
`;

const DefaultBackground = styled.div`
  width: 240px;
  height: 100%;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1550px) {
    max-width: 150px;
  }

  @media (max-width: 768px) {
    max-width: 130px;
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
    max-height: 24px;
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
    max-height: 24px;
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

const ErrorMessage = styled.div`
  position: absolute;
  margin-top: 15px;
  margin-left: 80px;
  color: ${({ theme }) => theme.colors.danger.normal};
  font-size: 12px;
  caret-color: transparent;
  z-index: 0;
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
