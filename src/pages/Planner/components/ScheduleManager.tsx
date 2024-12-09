import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PlanButtons from "@components/schedule/PlanButtons";
import RouteCardList from "@components/schedule/RouteCardList";
import ScheduleBar from "@components/schedule/ScheduleBar";
import HorisontalLogo from "@components/assets/images/HorisontalLogo";
import { useSchedules } from "../hooks/useWebSocketSchedules";
import { ROUTES } from "@routes/type";
import { useTypedParams } from "@common/hooks/useTypedParams";

const ScheduleManager = () => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();

  const {
    schedules,
    scheduleItems,
    requestScheduleList,
    requestScheduleItems,
    updateScheduleItem,
    deleteScheduleItem,
    isConnected,
  } = useSchedules(roomId);

  // 현재 날짜 및 플랜 관리
  const [currentDate, setCurrentDate] = useState(() => schedules[0]?.actualDate || "");
  const [currentPlan, setCurrentPlan] = useState("A");
  const [loading, setLoading] = useState(false);

  // 모든 스케줄에서 날짜만 추출한 배열
  const dateArray = schedules.map((schedule) => schedule.actualDate);

  // 주어진 날짜와 플랜에 해당하는 스케줄 ID를 찾아 반환
  const findScheduleId = useCallback(
    (actualDate: string, planType: string): number | null => {
      const schedule = schedules.find(
        (s) => s.actualDate === actualDate && s.planType === planType
      );

      return schedule?.scheduleId || null;
    },
    [schedules]
  );

  // 선택된 스케줄 ID에 해당하는 스케줄 아이템을 로드하는 함수
  const loadScheduleItems = useCallback(
    (scheduleId: number | null) => {
      if (!scheduleId) {
        return;
      }
      requestScheduleItems(scheduleId); // scheduleId로 아이템 요청
    },
    [requestScheduleItems]
  );

  useEffect(() => {
    if (schedules.length > 0) {
      const scheduleId = findScheduleId(currentDate, currentPlan);
      // 현재 날짜와 플랜에 맞는 스케줄 ID 찾기

      loadScheduleItems(scheduleId);
    }
  }, [currentDate, currentPlan, schedules, findScheduleId, loadScheduleItems]);

  const handlePlanChange = (planType: string) => {
    setCurrentPlan(planType); // 플랜 변경
    const scheduleId = findScheduleId(currentDate, planType);

    loadScheduleItems(scheduleId);
  };

  // 날짜 변경 시 처리하는 함수
  const handleDateChange = (actualDate: string) => {
    setCurrentDate(actualDate);
    const scheduleId = findScheduleId(actualDate, currentPlan);

    loadScheduleItems(scheduleId);
  };

  useEffect(() => {
    if (roomId && isConnected) {
      requestScheduleList();
    }
  }, [roomId, isConnected, requestScheduleList]);

  const onSave = useCallback(
    (scheduleItemId: number, name: string, content: string) => {
      if (!scheduleItemId || !name || !content) return;

      const previousItemId = null;
      const nextItemId = null;

      updateScheduleItem(scheduleItemId, name, content, previousItemId, nextItemId);
    },
    [updateScheduleItem]
  );

  const handleDelete = (scheduleItemId: number) => {
    setLoading(true);
    deleteScheduleItem(scheduleItemId);
    const scheduleId = findScheduleId(currentDate, currentPlan);
    
    loadScheduleItems(scheduleId);
  };

  return (
    <Container>
      <PlanButtons currentPlan={currentPlan} onChangePlan={handlePlanChange} />
      <ScheduleBox>
        <ScheduleBar
          currentDate={currentDate}
          schedules={dateArray} // 날짜 배열만 전달
          onChangeDate={handleDateChange}
        />
        <RouteCardList items={scheduleItems} onSave={onSave} deleteScheduleItem={handleDelete} />
        <button aria-hidden={loading}></button>
      </ScheduleBox>
      <LogoWrapper>
        <HorisontalLogo />
      </LogoWrapper>
    </Container>
  );
};

export default ScheduleManager;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
`;

const FlexEnd = styled(FlexColumn)`
  align-items: flex-end;
`;

const Container = styled(FlexColumn)`
  padding: 30px;
  max-width: 520px;
  max-height: 100vh;

  // 로고를 항상 아래에 고정하기 위한 설정
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상단 요소와 하단 요소 사이 간격 생성 */
  flex-grow: 1;

  /* 오른쪽에만 dashed 선 추가 및 border-radius 설정 */
  border-right: 4px dashed ${({ theme }) => theme.colors.stroke.neutral3};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;

  @media (max-width: 1500px) {
    padding: 16px;
    max-width: 410px;
  }
`;

const ScheduleBox = styled(FlexColumn)`
  align-items: center;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 25px;

  @media (max-height: 1060px) {
    margin-top: 20px;
    gap: 30px;
    margin-bottom: 25px;
  }
  @media (max-height: 700px) {
    margin-top: 30px;
    gap: 20px;
    margin-bottom: 10px;
  }
`;

const LogoWrapper = styled(FlexEnd)`
  /* margin-right: 10px; */
`;
