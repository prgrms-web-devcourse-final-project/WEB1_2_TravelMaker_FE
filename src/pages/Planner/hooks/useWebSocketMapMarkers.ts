/* eslint-disable no-console */
import { useWebSocketClient } from "@common/hooks/useWebSocketClient";
import { useCallback, useEffect, useState } from "react";

type MapWebSocketAction =
  | "ADD_MARKER"
  | "LIST_MARKERS"
  | "UPDATE_MARKER"
  | "DELETE_MARKER"
  | "ADDED_MARKER"
  | "UPDATED_MARKER"
  | "DELETED_MARKER";

interface MapBaseMessage {
  action: MapWebSocketAction;
}

interface MarkerData {
  markerId: number;
  email: string;
  scheduleId: number;
  lat: number;
  lng: number;
  color: string;
  confirm: boolean;
  itemOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 요청 페이로드 타입
interface AddMarkerPayload extends MapBaseMessage {
  action: "ADD_MARKER";
  data: {
    scheduleId: number;
    lat: number;
    lng: number;
  };
}

interface ListMarkersPayload extends MapBaseMessage {
  action: "LIST_MARKERS";
  data: {
    scheduleId: number;
  };
}

interface UpdateMarkerPayload extends MapBaseMessage {
  action: "UPDATE_MARKER";
  data: {
    markerId: number;
    confirm: boolean;
  };
}

interface DeleteMarkerPayload extends MapBaseMessage {
  action: "DELETE_MARKER";
  data: {
    markerId: number;
  };
}

// 응답 페이로드 타입
interface AddedMarkerPayload extends MapBaseMessage {
  action: "ADDED_MARKER";
  data: MarkerData;
}

interface ListMarkersResponsePayload extends MapBaseMessage {
  action: "LIST_MARKERS";
  data: MarkerData[];
}

interface UpdatedMarkerPayload extends MapBaseMessage {
  action: "UPDATED_MARKER";
  data: MarkerData;
}

interface DeletedMarkerPayload extends MapBaseMessage {
  action: "DELETED_MARKER";
  data: {
    message: string;
  };
}

type MapServerMessage =
  | AddedMarkerPayload
  | ListMarkersResponsePayload
  | UpdatedMarkerPayload
  | DeletedMarkerPayload;

// useMapMarkers.ts
export const useMapMarkers = (roomId?: string) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const { isConnected, sendMessage, subscribe } = useWebSocketClient();

  const handleMessage = useCallback((data: MapServerMessage) => {
    switch (data.action) {
      case "ADDED_MARKER":
        setMarkers((prev) => [...prev, data.data]);
        break;
      case "LIST_MARKERS":
        setMarkers(data.data);
        break;
      case "UPDATED_MARKER":
        setMarkers((prev) =>
          prev.map((marker) => (marker.markerId === data.data.markerId ? data.data : marker))
        );
        break;
      case "DELETED_MARKER":
        // eslint-disable-next-line no-case-declarations
        const deletedMarkerId = data.data.message.match(/\d+/)?.[0];

        if (deletedMarkerId) {
          setMarkers((prev) =>
            prev.filter((marker) => marker.markerId !== Number(deletedMarkerId))
          );
        }
        break;
    }
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error("마커 정보 수신 중 오류 발생:", error);
  }, []);

  useEffect(() => {
    if (isConnected && roomId) {
      const unsubscribe = subscribe(`/topic/room/${roomId}/map`, {
        onMessage: handleMessage,
        onError: handleError,
      });

      return () => {
        unsubscribe?.();
      };
    }
  }, [isConnected, roomId, handleMessage, handleError, subscribe]);

  const addMarker = useCallback(
    (scheduleId: number, lat: number, lng: number) => {
      if (!roomId) return;

      const message: AddMarkerPayload = {
        action: "ADD_MARKER",
        data: {
          scheduleId,
          lat,
          lng,
        },
      };

      sendMessage(`/app/room/${roomId}/map`, message);
    },
    [roomId, sendMessage]
  );

  const updateMarker = useCallback(
    (markerId: number, confirm: boolean) => {
      if (!roomId) return;

      const message: UpdateMarkerPayload = {
        action: "UPDATE_MARKER",
        data: {
          markerId,
          confirm,
        },
      };

      sendMessage(`/app/room/${roomId}/map`, message);
    },
    [roomId, sendMessage]
  );

  const deleteMarker = useCallback(
    (markerId: number) => {
      if (!roomId) return;

      const message: DeleteMarkerPayload = {
        action: "DELETE_MARKER",
        data: {
          markerId,
        },
      };

      sendMessage(`/app/room/${roomId}/map`, message);
    },
    [roomId, sendMessage]
  );

  const requestMarkerList = useCallback(
    (scheduleId: number) => {
      if (!roomId) return;

      const message: ListMarkersPayload = {
        action: "LIST_MARKERS",
        data: {
          scheduleId,
        },
      };

      sendMessage(`/app/room/${roomId}/map`, message);
    },
    [roomId, sendMessage]
  );

  return {
    markers,
    addMarker,
    updateMarker,
    deleteMarker,
    requestMarkerList,
    isConnected,
  };
};
