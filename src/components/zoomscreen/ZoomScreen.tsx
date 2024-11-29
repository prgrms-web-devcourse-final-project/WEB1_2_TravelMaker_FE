import React from "react";
import styled from "styled-components";
import PlusIcon from "../assets/icons/ZoomPlusIcon";
import MinusIcon from "../assets/icons/ZoomMinusIcon";

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
          <PlusIcon />
        </PlusIconWrapper>
      </ZoomButton>
      <Divider />
      <ZoomButton onClick={onZoomOut} disabled={currentZoom <= minZoom}>
        <MinusIconWrapper>
          <MinusIcon />
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
  width: 50px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.text.title};
  border-radius: 10px;
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
    border-radius: 10px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PlusIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MinusIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text.title};
`;

export default ZoomScreen;
