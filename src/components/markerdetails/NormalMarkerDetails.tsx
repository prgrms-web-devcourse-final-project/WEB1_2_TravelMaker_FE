import React from "react";
import styled from "styled-components";

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
  return (
    <DetailsContainer>
      <ImageWrapper>
        <Image src={imageSrc} alt={title} />
      </ImageWrapper>
      <ContentWrapper>
        <Content>
          <Title>{title}</Title>
          <Address>{address}</Address>
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
  width: 460px;
  height: 165px;
  padding: 25px;
  display: flex;
  gap: 10px;
  border: ${({ theme }) => theme.strokeWidth.thick} dashed
    ${({ theme }) => theme.colors.text.bodySubtle};
  border-radius: ${({ theme }) => theme.cornerRadius.extraLarge};
  box-shadow: ${({ theme }) => theme.shadows.small};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 70px;
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
  max-width: 180px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.regular.fontWeight};
  color: ${({ theme }) => theme.colors.text.title};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 80px;
  height: 40px;
  position: absolute;
  bottom: 25px;
  right: 25px;
  border: ${({ theme }) => theme.strokeWidth.thin} solid
    ${({ theme }) => theme.colors.background.neutral0};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  overflow: hidden;
`;

const ActionButton = styled.button<{ isRight?: boolean }>`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.heading.h4.fontSize};
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
