/* eslint-disable no-console */
import { useState, useCallback, useEffect } from "react";
import { WebSocketClient_ } from "@common/services/WebSocketClient_";

// ScheduleAction 정의
type ScheduleAction =
  | "LIST_SCHEDULES"
  | "LIST_SCHEDULEITEMS"
  | "UPDATED_SCHEDULE"
  | "UPDATED_SCHEDULEITEM"
  | "DELETE_SCHEDULEITEM"
  | "DELETED_SCHEDULEITEM"
  | "ADDED_SCHEDULEITEM";

// ScheduleMessage 정의 (제네릭 타입으로 수정)
interface ScheduleMessage<T> {
  action: ScheduleAction;
  data: T;
}

// 액션별 데이터 타입 정의
type ListSchedulesData = ScheduleList[];
type ListScheduleItemsData = ScheduleItem[];
type UpdateScheduleItemData = Partial<ScheduleItem> & { scheduleItemId: number };
type DeleteScheduleItemData = { scheduleItemId: number; message: string };

interface ScheduleList {
  actualDate: string;
  planType: string;
  scheduleId: number;
}

interface ScheduleItem {
  scheduleItemId: number;
  markerId: number;
  name: string;
  address: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  itemOrder: number;
}

export const useScheduleWS = (roomId?: string) => {
  const [schedules, setSchedules] = useState<ScheduleList[]>([]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const requestSchedules = useCallback(() => {
    if (!roomId) {
      console.warn("스케줄 요청 실패: 방 ID 없음");

      return;
    }

    const wsClient = WebSocketClient_.getInstance();

    wsClient.send(`/app/room/${roomId}/schedule`, { action: "LIST_SCHEDULES" });
  }, [roomId]);

  const requestScheduleItems = useCallback(
    (scheduleId: number) => {
      if (!scheduleId) {
        console.warn("스케줄 아이템 요청 실패: 스케줄 ID 없음");

        return;
      }

      const wsClient = WebSocketClient_.getInstance();

      wsClient.send(`/app/room/${roomId}/schedule`, {
        action: "LIST_SCHEDULEITEMS",
        data: { scheduleId },
      });
    },
    [roomId]
  );

  const updateScheduleItem = useCallback(
    (
      scheduleItemId: number,
      name: string,
      content: string,
      previousItemId: number | null,
      nextItemId: number | null
    ) => {
      if (!scheduleItemId || !name || !content) {
        console.warn("스케줄 아이템 수정 실패: 필수 값 부족");

        return;
      }

      const wsClient = WebSocketClient_.getInstance();

      // `roomId`와 `data`만 전달하면 됩니다
      wsClient.send(`/app/room/${roomId}/schedule`, {
        action: "UPDATED_SCHEDULEITEM",
        data: { scheduleItemId, name, content, previousItemId, nextItemId },
      });
    },
    [roomId]
  );

  const deleteScheduleItem = useCallback(
    (scheduleItemId: number) => {
      if (!scheduleItemId) {
        console.warn("스케줄 아이템 삭제 실패: ID 없음");

        return;
      }

      const wsClient = WebSocketClient_.getInstance();

      wsClient.send(`/app/room/${roomId}/schedule`, {
        action: "DELETE_SCHEDULEITEM",
        data: { scheduleItemId },
      });
    },
    [roomId]
  );

  const connect = useCallback(() => {
    if (!roomId) {
      console.warn("웹소켓 연결 실패: 방 ID 없음");

      return;
    }

    const wsClient = WebSocketClient_.getInstance();

    wsClient.setOnConnect(() => {
      console.log("웹소켓 연결 성공");

      try {
        wsClient.subscribe(`/topic/room/${roomId}/schedule`, {
          onMessage: (data) => {
            const message = data as ScheduleMessage<
              | ListSchedulesData
              | ListScheduleItemsData
              | UpdateScheduleItemData
              | DeleteScheduleItemData
            >;

            switch (message.action) {
              case "LIST_SCHEDULES": {
                setSchedules((message.data as ListSchedulesData) ?? []);
                break;
              }
              case "LIST_SCHEDULEITEMS": {
                setScheduleItems((message.data as ListScheduleItemsData) ?? []);
                break;
              }
              case "UPDATED_SCHEDULEITEM": {
                const updatedItem = message.data as UpdateScheduleItemData;

                setScheduleItems((prev) =>
                  prev.map((item) =>
                    item.scheduleItemId === updatedItem.scheduleItemId
                      ? { ...item, ...updatedItem }
                      : item
                  )
                );
                break;
              }
              case "DELETED_SCHEDULEITEM": {
                const { scheduleItemId } = message.data as DeleteScheduleItemData;

                setScheduleItems((prev) =>
                  prev.filter((item) => item.scheduleItemId !== scheduleItemId)
                );
                break;
              }
              default:
                console.warn("알 수 없는 액션:", message.action);
            }
          },
          onError: (error) => {
            console.error("웹소켓 에러:", error);
            setIsConnected(false);
          },
        });

        setIsConnected(true);
        requestSchedules();
      } catch (error) {
        console.error("웹소켓 초기화 에러:", error);
        setIsConnected(false);
      }
    });

    wsClient.connect(roomId);

    return () => {
      console.log("웹소켓 연결 종료");
      wsClient.disconnect();
      setIsConnected(false);
    };
  }, [roomId, requestSchedules]);

  useEffect(() => {
    const cleanup = connect();

    return () => cleanup?.();
  }, [connect]);

  return {
    schedules,
    scheduleItems,
    isConnected,
    requestSchedules,
    requestScheduleItems,
    updateScheduleItem,
    deleteScheduleItem,
  };
};
