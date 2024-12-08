import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PlanButtons from "@components/schedule/PlanButtons";
import RouteCardList from "@components/schedule/RouteCardList";
import ScheduleBar from "@components/schedule/ScheduleBar";
import HorisontalLogo from "@components/assets/images/HorisontalLogo";
import { useScheduleWS } from "../hooks/ScheduleWS";
import { ROUTES } from "@routes/type";
import { useTypedParams } from "@common/hooks/useTypedParams";

// 전체 스케줄을 나타내는 타입 정의
// interface Schedule {
//   scheduleId: number;
//   planType: string;
//   actualDate: string;
// }

// 스케줄 아이템의 타입 정의
interface ScheduleItem {
  scheduleItemId: number;
  markerId: number;
  name?: string;
  address: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  itemOrder: number; // 추가된 필드
}

const ScheduleManager = () => {
  // URL 파라미터로부터 방 ID를 받아오기
  const { roomId } = useTypedParams<typeof ROUTES.ENTER_MODAL>();

  // WebSocket을 통한 스케줄 및 스케줄 아이템 데이터와 연결 상태 관리
  //scheduleItems 안쓰여서 뺌
  const { schedules, isConnected, requestSchedules, requestScheduleItems } = useScheduleWS(roomId);

  // 현재 날짜 및 플랜을 관리하는 상태 변수
  const [currentDate, setCurrentDate] = useState(() => schedules[0]?.actualDate || "");
  const [currentPlan, setCurrentPlan] = useState("A");

  // 현재 선택된 날짜와 플랜에 해당하는 스케줄 아이템 상태 관리
  const [currentScheduleItems, setCurrentScheduleItems] = useState<ScheduleItem[]>([]);

  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // 모든 스케줄에서 날짜만 추출한 배열
  const dateArray = schedules.map((schedule) => schedule.actualDate);

  // 주어진 날짜와 플랜에 해당하는 스케줄 ID를 찾아 반환하는 함수
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
        setCurrentScheduleItems([]); // scheduleId가 없으면 빈 배열로 초기화

        return;
      }

      setLoading(true);
      requestScheduleItems(scheduleId); // scheduleId로 아이템을 요청
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
    // 변경된 플랜에 맞는 스케줄 ID 찾기

    loadScheduleItems(scheduleId);
  };

  // 날짜 변경 시 처리하는 함수
  const handleDateChange = (actualDate: string) => {
    setCurrentDate(actualDate); // 날짜 변경
    const scheduleId = findScheduleId(actualDate, currentPlan);
    // 변경된 날짜에 맞는 스케줄 ID 찾기

    loadScheduleItems(scheduleId);
  };

  // 컴포넌트가 마운트될 때 LIST_SCHEDULES 메시지를 서버로 전송하여 스케줄 목록을 요청하는 함수
  useEffect(() => {
    if (roomId) {
      requestSchedules(); // 페이지 진입 시 스케줄 요청
    }
  }, [roomId, requestSchedules]);

  useEffect(() => {
    if (isConnected) {
      setLoading(false); // 연결 성공 시 로딩 상태 해제
    }
  }, [isConnected]);

  return (
    <Container>
      {/* 플랜 버튼: 플랜 변경 시 해당 플랜에 맞는 일정 필터링 */}
      <PlanButtons currentPlan={currentPlan} onChangePlan={handlePlanChange} />

      <ScheduleBox>
        {/* 일정 바: 날짜 변경 시 해당 날짜에 맞는 일정 필터링 */}
        <ScheduleBar
          currentDate={currentDate}
          schedules={dateArray} // 날짜 배열만 전달
          onChangeDate={handleDateChange}
        />
        {/* 일정 카드 리스트: 선택된 날짜와 플랜에 맞는 스케줄 아이템을 리스트로 표시 */}
        <RouteCardList items={currentScheduleItems} />
        {/* 상태로 관리된 scheduleItems 전달 */}
      </ScheduleBox>

      <LogoWrapper>
        {/* 로고 표시 */}
        <HorisontalLogo />
        <button aria-hidden={loading}>작업 시작 </button>
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
