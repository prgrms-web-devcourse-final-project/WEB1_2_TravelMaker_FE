import React, { useState } from "react";
import styled from "styled-components";
import PreviousIcon from "@components/assets/icons/PreviousIcon";
import NextIcon from "@components/assets/icons/NextIcon";

interface ScheduleItem {
  schedule_id: number;
  title?: string;
  address: string;
  content: string;
}

interface Schedule {
  schedule_id: number;
  data: string; // 날짜 정보
  plan: string; // 계획
  date: string;
  room_id: string;
  scheduleItem?: ScheduleItem[];
}

interface ScheduleBarProps {
  schedules: Schedule[];
}

const ScheduleBar: React.FC<ScheduleBarProps> = ({ schedules }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 스케줄 인덱스

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : schedules.length - 1)); // 이전 버튼: 0이면 마지막으로 순환
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < schedules.length - 1 ? prevIndex + 1 : 0)); // 다음 버튼: 마지막이면 처음으로 순환
  };

  const currentSchedule = schedules[currentIndex];

  return (
    <Container>
      <Button onClick={handlePrev}>
        <PreviousIcon />
      </Button>
      <DataContainer>
        <>
          {currentSchedule.data} ({currentSchedule.date}
        </>
        )
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
