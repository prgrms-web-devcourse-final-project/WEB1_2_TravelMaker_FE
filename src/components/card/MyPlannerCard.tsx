import styled, { keyframes } from "styled-components";
import { FC, useState } from "react";

import EmptyBox from "@common/styles/Empty";
import { calcVwFromPx } from "@common/styles/theme";
import PlaneIcon, { PlaneIcon2 } from "@components/icons/Plane";

interface MyPlannerCardProps {
  onClick: () => void;
  title?: string;
  country: string;
  startDate: string;
  endDate: string;
}

const MyPlannerCard: FC<MyPlannerCardProps> = ({ onClick, title, country, startDate, endDate }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const onClickHandler = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  const onAnimationEndHandler = () => {
    onClick();
  };

  return (
    <OuterContainer onClick={onClickHandler}>
      <InnerContainer>
        {/* 상단 블록 */}
        <TopContainer>
          <PlaneIcon />
          <Label>{title ?? "MY TRIP"}</Label>
          <EmptyBox width={30} />
        </TopContainer>
        <ContentContainer>
          {/* 아이콘 블록 */}
          <IconContainer $isAnimating={isAnimating} onAnimationEnd={onAnimationEndHandler}>
            <PlaneIcon2 />
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
  width: ${calcVwFromPx(480)};
  min-width: 350px;
  min-height: 120px;
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
  padding: 0 10px;
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
  padding: 0 ${calcVwFromPx(15)};
  position: relative;
`;

const IconContainer = styled.div<{ $isAnimating: boolean }>`
  padding-left: clamp(25px, calc(2vw), 50px);
  animation: ${({ $isAnimating }) => ($isAnimating ? flyAnimation : "none")} 1s forwards;
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
  font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
  color: ${({ theme }) => theme.colors.background.neutral1};
  text-align: center;
  justify-self: center;
`;

const CountryLabel = styled(TicketingFont)`
  font-size: clamp(24px, ${calcVwFromPx(32)}, 32px);
  color: ${({ theme }) => theme.colors.text.title};
`;

const DateLabel = styled(TicketingFont)`
  text-align: right;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.text.title};

  @media (max-width: 1500px) {
  }
`;

export default MyPlannerCard;
