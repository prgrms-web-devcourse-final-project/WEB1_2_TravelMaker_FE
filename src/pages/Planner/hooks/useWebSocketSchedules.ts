/* eslint-disable no-console */
import { useWebSocketClient } from "@common/hooks/useWebSocketClient";
import { useCallback, useEffect, useState } from "react";

type ScheduleWebSocketAction =
  | "LIST_SCHEDULES"
  | "LIST_SCHEDULEITEMS"
  | "UPDATE_SCHEDULEITEM"
  | "DELETE_SCHEDULEITEM"
  | "ADDED_SCHEDULEITEM"
  | "UPDATED_SCHEDULEITEM"
  | "DELETED_SCHEDULEITEM";

interface ScheduleBaseMessage {
  action: ScheduleWebSocketAction;
}

interface Schedule {
  scheduleId: number;
  planType: string;
  actualDate: string;
}

interface ScheduleItem {
  scheduleItemId: number;
  markerId: number;
  name: string;
  address: string;
  content: string;
  itemOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 요청 페이로드
interface ListSchedulesPayload extends ScheduleBaseMessage {
  action: "LIST_SCHEDULES";
}

interface ListScheduleItemsPayload extends ScheduleBaseMessage {
  action: "LIST_SCHEDULEITEMS";
  data: {
    scheduleId: number;
  };
}

interface UpdateScheduleItemPayload extends ScheduleBaseMessage {
  action: "UPDATE_SCHEDULEITEM";
  data: {
    scheduleItemId: number;
    name: string;
    content: string;
    previousItemId: number | null;
    nextItemId: number | null;
  };
}

interface DeleteScheduleItemPayload extends ScheduleBaseMessage {
  action: "DELETE_SCHEDULEITEM";
  data: {
    scheduleItemId: number;
  };
}

// 응답 페이로드
interface AddedScheduleItemPayload extends ScheduleBaseMessage {
  action: "ADDED_SCHEDULEITEM";
  data: ScheduleItem;
}

interface ListSchedulesResponsePayload extends ScheduleBaseMessage {
  action: "LIST_SCHEDULES";
  data: Schedule[];
}

interface ListScheduleItemsResponsePayload extends ScheduleBaseMessage {
  action: "LIST_SCHEDULEITEMS";
  data: ScheduleItem[];
}

interface UpdatedScheduleItemPayload extends ScheduleBaseMessage {
  action: "UPDATED_SCHEDULEITEM";
  data: ScheduleItem;
}

interface DeletedScheduleItemPayload extends ScheduleBaseMessage {
  action: "DELETED_SCHEDULEITEM";
  data: {
    message: string;
  };
}

type ScheduleServerMessage =
  | AddedScheduleItemPayload
  | ListSchedulesResponsePayload
  | ListScheduleItemsResponsePayload
  | UpdatedScheduleItemPayload
  | DeletedScheduleItemPayload;

// useSchedules.ts
export const useSchedules = (roomId?: string) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const { isConnected, sendMessage, subscribe } = useWebSocketClient();

  const handleMessage = useCallback((data: ScheduleServerMessage) => {
    switch (data.action) {
      case "LIST_SCHEDULES":
        setSchedules(data.data);
        break;
      case "LIST_SCHEDULEITEMS":
        setScheduleItems(data.data);
        break;
      case "ADDED_SCHEDULEITEM":
        setScheduleItems((prev) => [...prev, data.data]);
        break;
      case "UPDATED_SCHEDULEITEM":
        setScheduleItems((prev) =>
          prev.map((item) => (item.scheduleItemId === data.data.scheduleItemId ? data.data : item))
        );
        break;
      case "DELETED_SCHEDULEITEM":
        // FIXME:
        // eslint-disable-next-line no-case-declarations
        const deletedItemId = data.data.message.match(/\d+/)?.[0];

        if (deletedItemId) {
          setScheduleItems((prev) =>
            prev.filter((item) => item.scheduleItemId !== Number(deletedItemId))
          );
        }
        break;
    }
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error("일정 정보 수신 중 오류 발생:", error);
  }, []);

  useEffect(() => {
    if (isConnected && roomId) {
      const unsubscribe = subscribe(`/topic/room/${roomId}/schedule`, {
        onMessage: handleMessage,
        onError: handleError,
      });

      return () => {
        unsubscribe?.();
      };
    }
  }, [isConnected, roomId, handleMessage, handleError, subscribe]);

  const requestScheduleList = useCallback(() => {
    if (!roomId) return;

    const message: ListSchedulesPayload = {
      action: "LIST_SCHEDULES",
    };

    sendMessage(`/app/room/${roomId}/schedule`, message);
  }, [roomId, sendMessage]);

  const requestScheduleItems = useCallback(
    (scheduleId: number) => {
      if (!roomId) return;

      const message: ListScheduleItemsPayload = {
        action: "LIST_SCHEDULEITEMS",
        data: {
          scheduleId,
        },
      };

      sendMessage(`/app/room/${roomId}/schedule`, message);
    },
    [roomId, sendMessage]
  );

  const updateScheduleItem = useCallback(
    (
      scheduleItemId: number,
      name: string,
      content: string,
      previousItemId: number | null = null,
      nextItemId: number | null = null
    ) => {
      if (!roomId) return;

      const message: UpdateScheduleItemPayload = {
        action: "UPDATE_SCHEDULEITEM",
        data: {
          scheduleItemId,
          name,
          content,
          previousItemId,
          nextItemId,
        },
      };

      sendMessage(`/app/room/${roomId}/schedule`, message);
    },
    [roomId, sendMessage]
  );

  const deleteScheduleItem = useCallback(
    (scheduleItemId: number) => {
      if (!roomId) return;

      const message: DeleteScheduleItemPayload = {
        action: "DELETE_SCHEDULEITEM",
        data: {
          scheduleItemId,
        },
      };

      sendMessage(`/app/room/${roomId}/schedule`, message);
    },
    [roomId, sendMessage]
  );

  return {
    schedules,
    scheduleItems,
    requestScheduleList,
    requestScheduleItems,
    updateScheduleItem,
    deleteScheduleItem,
    isConnected,
  };
};
