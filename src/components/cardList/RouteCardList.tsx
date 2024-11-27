import RouteCard from "@components/card/RouteCard";
import { ComponentProps, FC } from "react";
import styled from "styled-components";

interface Props {
  items: ComponentProps<typeof RouteCard>[];
}

const RouteCardList: FC<Props> = ({ items = [] }) => {
  return (
    <CardListContainer>
      {items.length > 0 ? (
        <>
          {items.map((item, index) => {
            return <RouteCard key={`${Math.random()}-${index}`} {...item} />;
          })}
        </>
      ) : (
        <RouteCard index={1} title="서울시 강남구" location="서울시 강남구" />
      )}
    </CardListContainer>
  );
};

const CardListContainer = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 730px; /* 아이템이 많을 때 730px을 초과하면 스크롤이 생기도록 설정 */
  overflow-y: scroll; /* 세로 스크롤이 자동으로 생기도록 설정 */
  scrollbar-width: none;
`;

export default RouteCardList;
