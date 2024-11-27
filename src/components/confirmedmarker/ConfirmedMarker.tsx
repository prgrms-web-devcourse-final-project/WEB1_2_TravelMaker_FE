import React from "react";
import styled from "styled-components";
import ConfirmedMarkerImage from "../assets/images/ConfirmedMarkerImage";

interface ConfirmedMarkerProps {
  index: number;
  size?: number;
}

export const ConfirmedMarker: React.FC<ConfirmedMarkerProps> = ({ index, size = 50 }) => {
  return (
    <MarkerWrapper size={size}>
      <IconWrapper>
        <StyledConfirmedMarkerImage />
      </IconWrapper>
      <IndexWrapper>
        <IndexText>{index}</IndexText>
      </IndexWrapper>
    </MarkerWrapper>
  );
};

const MarkerWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  background-color: ${({ theme }) => theme.colors.danger.normal};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

const StyledConfirmedMarkerImage = styled(ConfirmedMarkerImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const IndexWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border: ${({ theme }) => theme.strokeWidth.thin} solid ${({ theme }) => theme.colors.text.body};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const IndexText = styled.span`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.title};
`;

export default ConfirmedMarker;
