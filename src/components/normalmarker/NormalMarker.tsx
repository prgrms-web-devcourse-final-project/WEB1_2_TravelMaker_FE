import React from "react";
import styled from "styled-components";
import MarkerIcon from "../assets/images/NormalMarkerImage";
import Profile from "@components/chat/ChatProfile";
import { calcResponsive } from "@common/styles/theme";

interface NormalMarkerProps {
  profileImage: string;
  size?: number;
  profileSize?: number;
  onClick?: () => void;
  isSelected?: boolean;
  color?: string;
}

export const NormalMarker: React.FC<NormalMarkerProps> = ({
  profileImage,
  size = 28,
  profileSize = 28,
  onClick,
  isSelected = false,
  color,
}) => {
  return (
    <MarkerWrapper $size={size} $isSelected={isSelected} onClick={onClick}>
      <MarkerIcon color={color} />
      <ProfileWrapper size={profileSize}>
        <Profile.Image url={profileImage} size={profileSize} />
      </ProfileWrapper>
    </MarkerWrapper>
  );
};

const MarkerWrapper = styled.div<{ $size: number; $isSelected: boolean }>`
  width: ${({ $size }) => calcResponsive({ value: $size * 2, dimension: "width" })};
  height: ${({ $size }) => calcResponsive({ value: $size * 2.6, dimension: "width" })};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform: ${({ $isSelected }) => ($isSelected ? "scale(1.2)" : "scale(1)")};
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
`;

const ProfileWrapper = styled.div<{ size: number }>`
  position: absolute;
  top: 4px;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.text.title};
  overflow: hidden;
  transition: all 0.3s ease;
`;

export default React.memo(NormalMarker);
