import React from "react";
import styled from "styled-components";
import ConfirmedMarkerImage from "@components/assets/images/ConfirmedMarkerImage.svg";
import { calcResponsive } from "@common/styles/theme";

interface ConfirmedMarkerProps {
  index: number;
  size?: number;
}

export const ConfirmedMarker: React.FC<ConfirmedMarkerProps> = ({ index, size = 50 }) => {
  return (
    <MarkerWrapper size={size}>
      <IconWrapper>
        <StyledConfirmedMarkerImage src={ConfirmedMarkerImage} alt="Confirmed Marker" />
      </IconWrapper>
      <IndexWrapper size={size}>
        <IndexText size={size}>{index}</IndexText>
      </IndexWrapper>
    </MarkerWrapper>
  );
};

const MarkerWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => calcResponsive({ value: size, dimension: "width" })};
  height: ${({ size }) => calcResponsive({ value: size, dimension: "width" })};
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

const StyledConfirmedMarkerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IndexWrapper = styled.div<{ size: number }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${({ size }) => calcResponsive({ value: size * 0.4, dimension: "width" })};
  height: ${({ size }) => calcResponsive({ value: size * 0.4, dimension: "width" })};
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border: ${({ theme }) => theme.strokeWidth.thin} solid ${({ theme }) => theme.colors.text.body};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const IndexText = styled.span<{ size: number }>`
  font-size: ${calcResponsive({ value: 12, dimension: "height", minValue: 10 })};
  font-weight: ${({ theme }) => theme.typography.body.bold.fontWeight};
  color: ${({ theme }) => theme.colors.text.title};
`;

export default ConfirmedMarker;
