import styled, { keyframes } from "styled-components";
import { FC, useEffect, useState } from "react";

import { calcResponsive } from "@common/styles/theme";
import PlaneIcon, { PlaneIcon2 } from "@components/assets/icons/Plane";

interface MyPlannerCardProps {
  onClick: () => void;
  title?: string;
  country: string;
  startDate: string;
  endDate: string;
}

const MyPlannerCard: FC<MyPlannerCardProps> = ({ onClick, title, country, startDate, endDate }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isAnimating) {
      timeoutId = setTimeout(() => {
        setIsAnimating(false);
        onClick();
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [isAnimating, onClick]);

  const onClickHandler = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  return (
    <OuterContainer onClick={onClickHandler}>
      <InnerContainer>
        {/* 상단 블록 */}
        <TopContainer>
          <PlaneIcon width={icon.top} height={icon.top} />
          <Label>{title ?? "MY TRIP"}</Label>
          <div style={{ visibility: "hidden" }}>
            <PlaneIcon width={icon.top} height={icon.top} />
          </div>
        </TopContainer>
        <ContentContainer>
          {/* 아이콘 블록 */}
          <IconContainer $isAnimating={isAnimating}>
            <PlaneIcon2 width={icon.main.width} height={icon.main.height} />
          </IconContainer>
          {/* 국가 라벨 블록 */}
          <CountryLabelContainer $isAnimating={isAnimating}>
            <CountryLabel>{country}</CountryLabel>
          </CountryLabelContainer>
          {/* 날짜 블록 */}
          <DateLabelContainer $isAnimating={isAnimating}>
            <DateLabel>Departure:</DateLabel>
            <DateLabel>{startDate}</DateLabel>
            <DateLabel>Arrival:</DateLabel>
            <DateLabel>{endDate}</DateLabel>
          </DateLabelContainer>
        </ContentContainer>
      </InnerContainer>
    </OuterContainer>
  );
};

const icon = {
  top: calcResponsive({ value: 30, dimension: "height" }),
  main: {
    width: calcResponsive({ value: 70, dimension: "width" }),
    height: calcResponsive({ value: 49, dimension: "height" }),
  },
};

const flyAnimation = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform:translateX(250%) rotate(-20deg) translateY(-15px);
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  to {
    opacity: 0;
  }
`;

const OuterContainer = styled.div`
  display: flex;
  cursor: pointer;
  user-select: none;
  min-width: ${calcResponsive({ value: 480, dimension: "width" })};
  min-height: ${calcResponsive({ value: 120, dimension: "height" })};
  background-color: ${({ theme }) => theme.colors.background.neutral1};
  border-radius: ${({ theme }) => theme.cornerRadius.medium};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.regular} solid ${colors.secondary.normal}`};
  overflow: hidden;
`;

const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  padding: 0 ${calcResponsive({ value: 10, dimension: "width" })};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary.normal};
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${calcResponsive({ value: 15, dimension: "width" })};
  position: relative;
`;

const IconContainer = styled.div<{ $isAnimating: boolean }>`
  padding-left: ${calcResponsive({ value: 50, dimension: "width" })};
  animation: ${({ $isAnimating }) => ($isAnimating ? flyAnimation : "none")} 1s forwards;
  animation-play-state: ${({ $isAnimating }) => ($isAnimating ? "running" : "paused")};
`;

const CountryLabelContainer = styled.div<{ $isAnimating: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  white-space: nowrap;
  animation: ${({ $isAnimating }) => ($isAnimating ? fadeOut : "none")} 0.5s forwards;
`;

const DateLabelContainer = styled.div<{ $isAnimating: boolean }>`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  justify-items: start;
  animation: ${({ $isAnimating }) => ($isAnimating ? fadeOut : "none")} 0.5s forwards;
`;

const TicketingFont = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
`;

const Label = styled(TicketingFont)`
  font-size: ${({ theme }) =>
    calcResponsive({
      value: theme.typography.heading.h3.fontSize,
      dimension: "width",
      minValue: 17,
    })};
  color: ${({ theme }) => theme.colors.background.neutral1};
  text-align: center;
  justify-self: center;
`;

const CountryLabel = styled(TicketingFont)`
  font-size: ${({ theme }) =>
    calcResponsive({ value: theme.typography.heading.h1.fontSize, dimension: "height" })};
  color: ${({ theme }) => theme.colors.text.title};
`;

const DateLabel = styled(TicketingFont)`
  text-align: right;
  font-size: ${({ theme }) =>
    calcResponsive({ value: theme.typography.caption.fontSize, dimension: "width", minValue: 9 })};
  color: ${({ theme }) => theme.colors.text.title};
`;

export default MyPlannerCard;
