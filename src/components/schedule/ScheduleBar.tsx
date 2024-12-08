import React, { useEffect } from "react";
import styled from "styled-components";
import PreviousIcon from "@components/assets/icons/PreviousIcon";
import NextIcon from "@components/assets/icons/NextIcon";

// API 응답에 맞춘 스케줄 데이터 타입 정의
interface ScheduleBarProps {
  currentDate: string; // 현재 선택된 날짜
  schedules: string[]; // 날짜 배열
  onChangeDate: (date: string) => void; // 날짜 변경 핸들러
}

const ScheduleBar: React.FC<ScheduleBarProps> = ({ currentDate, schedules, onChangeDate }) => {
  // 첫 렌더링 시 currentDate를 Day1으로 설정
  useEffect(() => {
    if (schedules.length > 0 && !currentDate) {
      onChangeDate(schedules[0]); // schedules 배열의 첫 번째 값을 currentDate로 설정
    }
  }, [schedules, currentDate, onChangeDate]);

  // 현재 날짜의 인덱스 찾기
  const currentIndex = schedules.findIndex((date) => date === currentDate);
  // 날짜를 MM/DD 형식으로 변환하는 함수
  const formatDate = (date: string) => {
    // const [year, month, day] = date.split("-");
    //ESlint 때문에 어쩔수없었어요... 아래 거 죽이고 위에 거 살려주세요 ㅜㅜ
    const [month, day] = date.split("-");

    return `${month}/${day}`;
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : schedules.length - 1;

    onChangeDate(schedules[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < schedules.length - 1 ? currentIndex + 1 : 0;

    onChangeDate(schedules[nextIndex]);
  };

  return (
    <Container>
      <Button onClick={handlePrev}>
        <PreviousIcon />
      </Button>
      <DataContainer>
        <span>{`Day ${currentIndex + 1}`}</span>
        <span>{` (${formatDate(currentDate)})`}</span>
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

  @media (max-width: 1550px) {
    width: 370px;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    width: 320px;
    overflow: hidden;
  }
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

  @media (max-width: 1550px) {
    height: 50px;
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

  @media (max-width: 1550px) {
    height: 50px;
    font-size: ${({ theme }) => theme.typography.heading.h2.fontSize};
  }
`;
