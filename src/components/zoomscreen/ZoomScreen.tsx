import React, { useState } from "react";
import styled from "styled-components";
import PlusIcon from "../assets/icons/ZoomPlusIcon";
import MinusIcon from "../assets/icons/ZoomMinusIcon";

interface ZoomScreenProps {
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

export const ZoomScreen: React.FC<ZoomScreenProps> = ({
  initialZoom = 1,
  minZoom = 0.5,
  maxZoom = 3,
}) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom * 1.2, maxZoom));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom / 1.2, minZoom));
  };

  return (
    <ZoomWrapper zoom={zoomLevel}>
      <ZoomContainer>
        <ZoomButton onClick={handleZoomIn}>
          <PlusIconWrapper>
            <PlusIcon />
          </PlusIconWrapper>
        </ZoomButton>
        <Divider />
        <ZoomButton onClick={handleZoomOut}>
          <MinusIconWrapper>
            <MinusIcon />
          </MinusIconWrapper>
        </ZoomButton>
      </ZoomContainer>
    </ZoomWrapper>
  );
};

const ZoomWrapper = styled.div<{ zoom: number }>`
  transform: scale(${({ zoom }) => zoom});
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.neutral1};
`;

const ZoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.colors.text.title};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
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
