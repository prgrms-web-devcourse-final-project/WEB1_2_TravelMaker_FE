import React, { useState } from "react";
import styled from "styled-components";
import Profile from "../assets/images/ProfileImage";
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
  const [profileImage, setProfileImage] = useState(src);

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

  return (
    <Container>
      <ProfileWrapper>
        {profileImage ? (
          <ProfileImage src={profileImage} alt="Profile" />
        ) : (
          <DefaultBackground>
            <Profile />
          </DefaultBackground>
        )}
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
  padding-top: 220px;
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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-radius: 50%;
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
  margin-left: 30px;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  color: #2b4461;
  text-align: center;
  border: none;
  border-bottom: 2px solid #2b4461;
  outline: none;
`;

const ConfirmButton = styled.button`
  font-size: 20px;
  background-color: #2b4461;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #1b2636;
  }
`;

const UserName = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #2b4461;
`;

const EditIconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Email = styled.div`
  width: 280px;
  font-size: 24px;
  color: #2b4461;
`;
