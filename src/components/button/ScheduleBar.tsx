import React from "react";
import styled from "styled-components";
import PreviousIcon from "@components/assets/icons/PreviousIcon";
import NextIcon from "@components/assets/icons/NextIcon";

// 개별 스케줄 데이터의 타입 정의
// 개별 스케줄 데이터의 타입 정의
interface Schedule {
  schedule_id: number; // 스케줄의 고유 ID
  plan: string; // 플랜 (예: "A", "B", "C")
  date: string; // 날짜 (예: "11/20")
  room_id: string; // 방 ID
  scheduleItem?: {
    schedule_id: number;
    marker_id?: number;
    title?: string;
    address: string;
    content: string;
  }[];
}

interface ScheduleBarProps {
  schedules: Schedule[];
  currentDate: string; // 현재 선택된 날짜
  onChangeDate: (date: string) => void; // 날짜 변경 핸들러
}

const ScheduleBar: React.FC<ScheduleBarProps> = ({ schedules, currentDate, onChangeDate }) => {
  // 현재 날짜의 인덱스를 찾는 함수
  const currentIndex = schedules.findIndex((s) => s.date === currentDate);

  const handlePrev = () => {
    if (schedules.length > 0) {
      // 이전 날짜가 없으면 마지막 날짜로 돌아가게 처리
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : schedules.length - 1;

      onChangeDate(schedules[prevIndex].date); // 이전 날짜로 변경
    }
  };

  const handleNext = () => {
    if (schedules.length > 0) {
      const nextIndex = currentIndex < schedules.length - 1 ? currentIndex + 1 : 0;

      onChangeDate(schedules[nextIndex].date); // 다음 날짜로 변경
    }
  };

  return (
    <Container>
      <Button onClick={handlePrev}>
        <PreviousIcon />
      </Button>
      <DataContainer>
        {schedules.length > 0 && currentIndex !== -1 ? (
          <>
            <span>{`Day ${currentIndex + 1}`}</span>
            <span>{` (${currentDate})`}</span>
          </>
        ) : (
          <span>{`Day 1`}</span>
        )}
      </DataContainer>
      <Button onClick={handleNext}>
        <NextIcon />
      </Button>
    </Container>
  );
};

export default ScheduleBar;

const Container = styled.div`
  width: 410px;
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  display: flex; /* Flexbox 활성화 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.stroke.neutral3}`};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover || "#0056b3"};
  }
`;

const DataContainer = styled.div`
  padding: 6px;
  width: 240px;
  height: 60px;
  border-radius: ${({ theme }) => theme.cornerRadius.large};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.stroke.neutral3}`};
  background-color: ${({ theme }) => theme.colors.primary.subtle};
  flex-grow: 1;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.heading.h1.fontSize};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.body};
`;
