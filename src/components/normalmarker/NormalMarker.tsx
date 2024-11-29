import React from "react";
import styled from "styled-components";
import MarkerIcon from "../assets/images/NormalMarkerImage";

interface NormalMarkerProps {
  profileImage: string;
  size?: number;
  profileSize?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

export const NormalMarker: React.FC<NormalMarkerProps> = ({
  profileImage,
  size = 28,
  profileSize = 28,
  onClick,
  isSelected = false,
}) => {
  return (
    <MarkerWrapper $size={size} $isSelected={isSelected} onClick={onClick}>
      <MarkerIcon />
      <ProfileWrapper $profileSize={profileSize}>
        <ProfileImage src={profileImage} alt="Profile" />
      </ProfileWrapper>
    </MarkerWrapper>
  );
};

const MarkerWrapper = styled.div<{ $size: number; $isSelected: boolean }>`
  position: relative;
  width: ${({ $size }) => $size * 1.6}px;
  height: ${({ $size }) => $size * 1.6}px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isSelected }) => ($isSelected ? "scale(1.2)" : "scale(1)")};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
`;

const ProfileWrapper = styled.div<{ $profileSize: number }>`
  width: ${({ $profileSize }) => $profileSize}px;
  height: ${({ $profileSize }) => $profileSize}px;
  position: absolute;
  top: -3px;
  transform: translateX(-50%, 20%);
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.text.title};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export default NormalMarker;
