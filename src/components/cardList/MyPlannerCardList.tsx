import { calcResponsive, calcVhFromPx } from "@common/styles/theme";
import MyPlannerCard from "@components/card/MyPlannerCard";
import { ComponentProps, FC } from "react";
import styled from "styled-components";

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
            endDate="yyyy.mm.dd"
            onClick={onEmptyCardClick}
            startDate="yyyy.mm.dd"
          />
        )}
      </CardListContainer>
    </div>
  );
};

const HeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.body};
`;

const CardListContainer = styled.div`
  padding: ${calcResponsive(25, 50)} ${calcResponsive(10, 20)};
  display: flex;
  flex-direction: column;
  gap: ${calcResponsive(15, 30)};
  max-height: ${calcResponsive(335, 670)};
  overflow: scroll;
  min-height: ${calcVhFromPx(670)};
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.regular} solid ${colors.secondary.strong}`};
`;

export default MyPlannerCardList;
