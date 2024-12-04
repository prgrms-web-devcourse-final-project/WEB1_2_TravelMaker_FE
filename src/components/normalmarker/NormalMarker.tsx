import React from "react";
import styled from "styled-components";
import MarkerIcon from "../assets/images/NormalMarkerImage";
import Profile from "@components/chat/ChatProfile";

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
      <ProfileWrapper>
        <Profile.Image url={profileImage} size={profileSize} />
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

const ProfileWrapper = styled.div`
  position: absolute;
  top: -5px;
  transform: translateX(-50%, 20%);
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.text.title};
  overflow: hidden;
  transition: all 0.3s ease;
`;

export default React.memo(NormalMarker);
