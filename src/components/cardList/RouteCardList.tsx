// import React from "react";
import styled from "styled-components";
import RouteCard from "@components/card/RouteCard";
import { ComponentProps, FC } from "react";
import InfoCard from "@components/card/InfoCard";

interface RouteCardListProps {
  items: ComponentProps<typeof RouteCard>[]; // RouteCard에서 받아올 Props 타입
}

const RouteCardList: FC<RouteCardListProps> = ({ items = [] }) => {
  return (
    <CardListContainer>
      {items.length > 0 ? (
        items.map((item, index) => (
          <RouteCard
            key={`${item.scheduleItemId}-${index}`}
            {...item}
            markerId={item.markerId ?? index + 1} // markerId가 없으면 index + 1로 설정
          />
        ))
      ) : (
        <InfoCard>
          <p>일반 마커를 확정하면</p> {/* 문구만 표시 */}
          <p>순서대로 일정이 추가됩니다.</p>
        </InfoCard>
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
