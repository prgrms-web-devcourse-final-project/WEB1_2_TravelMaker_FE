import React, { useState, useRef } from "react";
import styled from "styled-components";
import { calcResponsive } from "@common/styles/theme";

interface NormalMarkerDetailsProps {
  title: string;
  address: string;
  imageSrc: string;
  onDelete: () => void;
  onConfirm: () => void;
}

export const NormalMarkerDetails: React.FC<NormalMarkerDetailsProps> = ({
  title,
  address,
  imageSrc,
  onDelete,
  onConfirm,
}) => {
  const [tooltip, setTooltip] = useState<string | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const addressRef = useRef<HTMLParagraphElement | null>(null);

  const checkOverflow = (element: HTMLElement | null) => {
    if (!element) return false;

    return element.scrollWidth > element.clientWidth || element.offsetHeight < element.scrollHeight;
  };

  const handleMouseEnter = (content: string, ref: React.RefObject<HTMLElement>) => {
    if (ref.current && checkOverflow(ref.current)) {
      setTooltip(content);
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <DetailsContainer>
      <ImageWrapper>
        <Image src={imageSrc} alt={title} />
      </ImageWrapper>
      <ContentWrapper>
        <Content>
          <Title
            ref={titleRef}
            onMouseEnter={() => handleMouseEnter(title, titleRef)}
            onMouseLeave={handleMouseLeave}>
            {title}
          </Title>
          <Address
            ref={addressRef}
            onMouseEnter={() => handleMouseEnter(address, addressRef)}
            onMouseLeave={handleMouseLeave}>
            {address}
          </Address>
          {tooltip && <Tooltip>{tooltip}</Tooltip>}
        </Content>
      </ContentWrapper>
      <ButtonWrapper>
        <ActionButton onClick={onDelete} isRight>
          삭제
        </ActionButton>
        <ActionButton onClick={onConfirm}>확정</ActionButton>
      </ButtonWrapper>
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  width: ${calcResponsive({ value: 460, dimension: "width" })};
  height: ${calcResponsive({ value: 165, dimension: "height" })};
  padding: ${calcResponsive({ value: 25, dimension: "width" })};
  display: flex;
  gap: ${calcResponsive({ value: 10, dimension: "width" })};
  border: ${({ theme }) => theme.strokeWidth.thick} dashed
    ${({ theme }) => theme.colors.text.bodySubtle};
  border-radius: ${({ theme }) => theme.cornerRadius.extraLarge};
  box-shadow: ${({ theme }) => theme.shadows.small};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  position: relative;
`;

const ImageWrapper = styled.div`
  width: ${calcResponsive({ value: 100, dimension: "width" })};
  height: ${calcResponsive({ value: 70, dimension: "height" })};
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  max-width: ${calcResponsive({ value: 200, dimension: "width" })};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calcResponsive({ value: 10, dimension: "width" })};
`;

const Title = styled.h2`
  font-size: ${calcResponsive({ value: 18, dimension: "width", minValue: 12 })};
  font-weight: ${({ theme }) => theme.typography.body.regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.title};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Address = styled.p`
  font-size: ${calcResponsive({ value: 14, dimension: "width", minValue: 10 })};
  color: ${({ theme }) => theme.colors.text.body};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: ${calcResponsive({ value: -25, dimension: "height" })};
  left: ${calcResponsive({ value: 0, dimension: "width" })};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  color: ${({ theme }) => theme.colors.text.title};
  font-size: ${calcResponsive({ value: 12, dimension: "height", minValue: 8 })};
  padding: ${calcResponsive({ value: 5, dimension: "height" })};
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  white-space: nowrap;
  z-index: 10;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: ${calcResponsive({ value: 80, dimension: "width" })};
  height: ${calcResponsive({ value: 40, dimension: "height" })};
  position: absolute;
  bottom: ${calcResponsive({ value: 25, dimension: "height" })};
  right: ${calcResponsive({ value: 25, dimension: "width" })};
  border: ${({ theme }) => theme.strokeWidth.thin} solid
    ${({ theme }) => theme.colors.background.neutral0};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  overflow: hidden;
`;

const ActionButton = styled.button<{ isRight?: boolean }>`
  flex: 1;
  font-size: ${calcResponsive({ value: 14, dimension: "height", minValue: 10 })};
  color: ${({ theme }) => theme.colors.primary.subtle};
  background-color: ${({ theme }) => theme.colors.text.title};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.body};
  }

  ${({ isRight }) =>
    isRight &&
    `
    border-right: 1px solid #F1F7FD;
  `}
`;

export default NormalMarkerDetails;
