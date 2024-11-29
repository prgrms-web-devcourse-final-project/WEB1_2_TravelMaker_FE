import RouteCard from "@components/card/RouteCard";
import { ComponentProps, FC } from "react";
import styled from "styled-components";

interface RouteCardListProps {
  items?: ComponentProps<typeof RouteCard>[]; // RouteCard에서 받아올 Props 타입 사용
}

const RouteCardList: FC<RouteCardListProps> = ({ items = [] }) => {
  return (
    <CardListContainer>
      {items.length > 0 ? (
        items.map((item, index) => (
          // key를 Math.random()으로 생성하는 대신 안전한 방식으로 변경
          <RouteCard
            key={`${item.schedule_id}-${index}`}
            {...item}
            marker_id={index + 1} // 인덱스는 1부터 시작
          />
        ))
      ) : (
        // 기본 값으로 출력할 카드
        <RouteCard marker_id={1} title="서울시 강남구" address="서울시 강남구" schedule_id={0} />
      )}
    </CardListContainer>
  );
};

export default RouteCardList;

// 스타일 정의
const CardListContainer = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 730px;
  overflow-y: scroll; /* 스크롤 설정 */
`;
