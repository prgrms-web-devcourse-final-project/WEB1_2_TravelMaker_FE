import styled from "styled-components";
import { ComponentProps, FC } from "react";

import { calcResponsive } from "@common/styles/theme";
import MyPlannerCard from "@components/card/MyPlannerCard";
import { hideScrollbar } from "@common/styles/hideScrollbar";
import { formatDate } from "@common/utils/formatDate";

interface Props {
  items: ComponentProps<typeof MyPlannerCard>[];
  onEmptyCardClick: () => void;
}

const MyPlannerCardList: FC<Props> = ({ onEmptyCardClick, items = [] }) => {
  return (
    <div>
      <HeaderTitle>MY PLANNER</HeaderTitle>
      <CardListContainer>
        {items.length > 0 ? (
          <>
            {items.map((item, index) => {
              return <MyPlannerCard key={`${Math.random()}-${index}`} {...item} />;
            })}
          </>
        ) : (
          <MyPlannerCard
            title="완벽한 여행, 시작해볼까요?"
            country="Travel now!"
            startDate={formatDate(new Date())}
            endDate={formatDate(new Date())}
            onClick={onEmptyCardClick}
          />
        )}
      </CardListContainer>
    </div>
  );
};

const HeaderTitle = styled.h1`
  font-size: ${calcResponsive({ value: 36, dimension: "height" })};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.body};
`;

const CardListContainer = styled.div`
  ${hideScrollbar}
  padding: ${calcResponsive({ value: 25, dimension: "height" })}${calcResponsive({
    value: 10,
    dimension: "width",
  })};
  display: flex;
  flex-direction: column;
  gap: ${calcResponsive({ value: 30, dimension: "height" })};
  min-height: ${calcResponsive({ value: 670, dimension: "height" })};
  max-height: ${calcResponsive({ value: 670, dimension: "height" })};
  overflow: scroll;
  overflow-x: hidden;
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.regular} solid ${colors.secondary.strong}`};
`;

export default MyPlannerCardList;
