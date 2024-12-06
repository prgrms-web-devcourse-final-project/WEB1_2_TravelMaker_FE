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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: calc(92vh - 200px); /* 화면 전체 높이에서 상하 여백 빼기 */
  overflow-y: auto; /* 스크롤 활성화 */

  @media (max-width: 1550px) {
    width: 380px;
    gap: 15px;
  }

  @media (max-width: 1024px) {
    width: 330px;
    gap: 15px;
  }

  /* 스크롤바 스타일링 추가 */
  overflow-x: hidden;
  overflow-y: auto;

  /* 스크롤 동작을 부드럽게 만드는 속성*/
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  /* y축 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 0px;
  }

  // 스크롤바의 트랙(스크롤 손잡이가 움직이는 영역)
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.extraLarge};
  }

  // #9FCAF1
  // 스크롤바의 손잡이 부분
  &::-webkit-scrollbar-thumb {
    background: rgba(159, 202, 241, 0.5);
    border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.extraLarge};

    &:hover {
      background: rgba(159, 202, 241, 0.8);
    }
  }
`;
