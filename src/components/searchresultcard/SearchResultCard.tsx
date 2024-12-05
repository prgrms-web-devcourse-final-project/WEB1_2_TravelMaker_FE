import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import SmallPing from "../assets/images/SmallPing.svg";
import { calcResponsive } from "@common/styles/theme";

interface SearchResultCardProps {
  imageSrc: string;
  title: string;
  address: string;
  lat: number;
  lng: number;
  onLocationClick?: (lat: number, lng: number) => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  imageSrc,
  title,
  address,
  onLocationClick,
  lat,
  lng,
}) => {
  const [animate, setAnimate] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const addressRef = useRef<HTMLParagraphElement | null>(null);

  const handlePingClick = () => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
      if (onLocationClick && lat !== undefined && lng !== undefined) {
        onLocationClick(lat, lng);
      }
    }, 1200);
  };

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
    <Container>
      <ImageWrapper $animate={animate}>
        <Image src={imageSrc} alt={title} />
      </ImageWrapper>
      <Content $animate={animate}>
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
      <AnimatedPing className={animate ? "animate" : ""}>
        <LocationIconWrapper onClick={handlePingClick}>
          <img src={SmallPing} alt="SmallPing" />
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
  width: ${calcResponsive({ value: 360, dimension: "width" })};
  height: ${calcResponsive({ value: 100, dimension: "height" })};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${calcResponsive({ value: 15, dimension: "width" })};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  border: ${({ theme }) => theme.strokeWidth.regular} solid ${({ theme }) => theme.colors.text.body};
  position: relative;
`;

const ImageWrapper = styled.div<{ $animate: boolean }>`
  flex-shrink: 0;
  width: ${calcResponsive({ value: 100, dimension: "width" })};
  height: ${calcResponsive({ value: 70, dimension: "height" })};
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  margin-left: ${calcResponsive({ value: 5, dimension: "width" })};
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
  margin-left: ${calcResponsive({ value: 20, dimension: "width" })};
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${({ $animate }) => ($animate ? fadeOut : "none")} 0.5s forwards;
`;

const Title = styled.h3`
  font-size: ${calcResponsive({ value: 18, dimension: "height" })};
  font-weight: ${({ theme }) => theme.typography.heading.h4.fontWeight};
  color: ${({ theme }) => theme.colors.text.title};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${calcResponsive({ value: 160, dimension: "width" })};
`;

const Address = styled.p`
  font-size: ${calcResponsive({ value: 14, dimension: "height" })};
  color: ${({ theme }) => theme.colors.text.body};
  margin: ${calcResponsive({ value: 5 })} 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${calcResponsive({ value: 180, dimension: "width" })};
`;

const Tooltip = styled.div`
  position: fixed;
  bottom: ${calcResponsive({ value: 200, dimension: "height" })};
  left: ${calcResponsive({ value: 580, dimension: "width" })};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  color: ${({ theme }) => theme.colors.text.title};
  font-size: ${calcResponsive({ value: 12, dimension: "height" })};
  padding: ${calcResponsive({ value: 5, dimension: "width" })};
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  width: ${calcResponsive({ value: 360, dimension: "width" })};
  z-index: 10;
`;

const LocationIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${calcResponsive({ value: 28, dimension: "width" })};
  height: ${calcResponsive({ value: 28, dimension: "width" })};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border-radius: ${({ theme }) => theme.cornerRadius.circular};
  border: ${({ theme }) => theme.strokeWidth.regular} solid
    ${({ theme }) => theme.colors.text.title};
  cursor: pointer;
`;

const AnimatedPing = styled.div`
  position: absolute;
  top: ${calcResponsive({ value: 10, dimension: "height" })};
  right: ${calcResponsive({ value: 10, dimension: "width" })};
  &.animate {
    animation: ${growAndCenter} 1s forwards;
  }
`;

export default SearchResultCard;
