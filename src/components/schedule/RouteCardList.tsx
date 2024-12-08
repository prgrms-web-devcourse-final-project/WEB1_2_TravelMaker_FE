import styled from "styled-components";
import RouteCard from "@components/schedule/RouteCard";
import { FC } from "react";
import InfoCard from "@components/schedule/InfoCard";

interface RouteCardListProps {
  items: ScheduleItem[]; // ScheduleItem[] 타입으로 수정
  onSave: (scheduleItemId: number, name: string, content: string) => void;
  deleteScheduleItem: (scheduleItemId: number) => void; // 삭제 함수 추가
}

export interface ScheduleItem {
  scheduleItemId: number;
  markerId: number;
  name: string;
  address: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  itemOrder: number;
}

const RouteCardList: FC<RouteCardListProps> = ({ items, onSave, deleteScheduleItem }) => {
  return (
    <CardListContainer>
      {items.length > 0 ? (
        items.map((item, index) => (
          <RouteCard
            key={`${item.scheduleItemId}-${index}`}
            item={item} // RouteCard에 item을 전달
            onSave={onSave} // onSave를 RouteCard에 전달
            deleteScheduleItem={deleteScheduleItem}
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
