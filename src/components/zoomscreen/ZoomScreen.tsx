import React from "react";
import styled from "styled-components";
import PlusIcon from "../assets/icons/ZoomPlusIcon.svg";
import MinusIcon from "../assets/icons/ZoomMinusIcon.svg";
import { calcResponsive } from "@common/styles/theme";

interface ZoomScreenProps {
  currentZoom: number;
  minZoom: number;
  maxZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ZoomScreen: React.FC<ZoomScreenProps> = ({
  currentZoom,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <ZoomContainer>
      <ZoomButton onClick={onZoomIn} disabled={currentZoom >= maxZoom}>
        <PlusIconWrapper>
          <img src={PlusIcon} alt="PlusIcon" />
        </PlusIconWrapper>
      </ZoomButton>
      <Divider />
      <ZoomButton onClick={onZoomOut} disabled={currentZoom <= minZoom}>
        <MinusIconWrapper>
          <img src={MinusIcon} alt="MinusIcon" />
        </MinusIconWrapper>
      </ZoomButton>
    </ZoomContainer>
  );
};

const ZoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${calcResponsive({ value: 50, dimension: "width" })};
  height: ${calcResponsive({ value: 100, dimension: "height" })};
  border: ${({ theme }) => theme.strokeWidth.regular} solid
    ${({ theme }) => theme.colors.text.title};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  background-color: ${({ theme }) => theme.colors.stroke.neutral1};
  opacity: 0.8;
`;

const ZoomButton = styled.button`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.neutral1};
    border-radius: ${({ theme }) => theme.cornerRadius.large};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PlusIconWrapper = styled.div`
  width: ${calcResponsive({ value: 30, dimension: "width" })};
  height: ${calcResponsive({ value: 30, dimension: "height" })};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MinusIconWrapper = styled.div`
  width: ${calcResponsive({ value: 30, dimension: "width" })};
  height: ${calcResponsive({ value: 30, dimension: "height" })};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: 100%;
  height: ${calcResponsive({ value: 1, dimension: "height" })};
  background-color: ${({ theme }) => theme.colors.text.title};
`;

export default ZoomScreen;
