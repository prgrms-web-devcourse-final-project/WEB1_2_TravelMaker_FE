import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import SmallPing from "../assets/images/SmallPing";

interface SearchResultCardProps {
  imageSrc: string;
  title: string;
  address: string;
  onLocationClick?: () => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  imageSrc,
  title,
  address,
  onLocationClick,
}) => {
  const [animate, setAnimate] = useState(false);

  const handlePingClick = () => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
      if (onLocationClick) onLocationClick();
    }, 1200);
  };

  return (
    <Container>
      <ImageWrapper $animate={animate}>
        <Image src={imageSrc} alt={title} />
      </ImageWrapper>
      <Content $animate={animate}>
        <Title>{title}</Title>
        <Address>{address}</Address>
      </Content>
      <AnimatedPing className={animate ? "animate" : ""}>
        <LocationIconWrapper onClick={handlePingClick}>
          <SmallPing />
        </LocationIconWrapper>
      </AnimatedPing>
    </Container>
  );
};

const growAndCenter = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(calc(-530%), calc(90%)) scale(3);
    opacity: 0.7;
  }
  100% {
    transform: translate(calc(-530%), calc(90%)) scale(0);
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 360px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border: 1px solid ${({ theme }) => theme.colors.text.body};
  position: relative;
`;

const ImageWrapper = styled.div<{ $animate: boolean }>`
  flex-shrink: 0;
  width: 100px;
  height: 70px;
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  margin-left: 5px;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  overflow: hidden;
  animation: ${({ $animate }) => ($animate ? fadeOut : "none")} 0.5s forwards;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div<{ $animate: boolean }>`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${({ $animate }) => ($animate ? fadeOut : "none")} 0.5s forwards;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.heading.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.heading.h4.fontWeight};
  color: ${({ theme }) => theme.colors.text.title};
  margin: 0;
`;

const Address = styled.p`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.text.body};
  margin: 15px 0 0;
`;

const LocationIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  border: ${({ theme }) => theme.strokeWidth.regular} solid
    ${({ theme }) => theme.colors.text.title};
  cursor: pointer;
`;

const AnimatedPing = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  &.animate {
    animation: ${growAndCenter} 1s forwards;
  }
`;

export default SearchResultCard;
