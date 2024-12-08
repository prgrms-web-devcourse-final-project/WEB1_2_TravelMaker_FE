/* eslint-disable no-console */
import { useState, useCallback, useEffect } from "react";
import { WebSocketClient_ } from "@common/services/WebSocketClient_";

type MarkerAction = "ADDED_MARKER" | "LIST_MARKERS" | "UPDATED_MARKER" | "DELETED_MARKER";

interface MarkerMessage<T> {
  action: MarkerAction;
  data: T;
}

export interface Marker {
  markerId: number;
  email: string;
  profileImage: string;
  scheduleId: number;
  lat: number;
  lng: number;
  color: string;
  confirm: boolean;
  itemOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface WebSocketMarkerHook {
  markers: Marker[];
  isConnected: boolean;
  addMarker: (scheduleId: number, lat: number, lng: number) => void;
  updateMarker: (markerId: number, confirm: boolean) => void;
  deleteMarker: (markerId: number) => void;
  fetchMarkers: (scheduleId: number) => void;
  addSearchMarker: (
    scheduleId: number,
    lat: number,
    lng: number,
    title: string,
    address: string,
    imageSrc: string
  ) => void;
}

export const useWebSocketMarker = (roomId: string | undefined): WebSocketMarkerHook => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // 마커 목록 요청
  const fetchMarkers = useCallback(
    (scheduleId: number) => {
      if (!roomId) return;

      const wsClient = WebSocketClient_.getInstance();

      wsClient.send(`/app/room/${roomId}/map`, { action: "LIST_MARKERS", data: { scheduleId } });
    },
    [roomId]
  );

  // 마커 추가
  const addMarker = useCallback(
    (scheduleId: number, lat: number, lng: number) => {
      if (!roomId) return;

      const wsClient = WebSocketClient_.getInstance();

      wsClient.send(`/app/room/${roomId}/map`, {
        action: "ADD_MARKER",
        data: { scheduleId, lat, lng },
      });
    },
    [roomId]
  );

  // 검색 마커 추가
  const addSearchMarker = useCallback(
    (
      scheduleId: number,
      lat: number,
      lng: number,
      title: string,
      address: string,
      imageSrc: string
    ) => {
      if (!roomId) return;

      const wsClient = WebSocketClient_.getInstance();

      wsClient.send(`/app/room/${roomId}/map`, {
        action: "ADD_MARKER",
        data: { scheduleId, lat, lng, title, address, imageSrc },
      });
    },
    [roomId]
  );

  // 마커 수정
  const updateMarker = useCallback(
    (markerId: number, confirm: boolean) => {
      if (!roomId) return;

      const wsClient = WebSocketClient_.getInstance();

      wsClient.send(`/app/room/${roomId}/map`, {
        action: "UPDATE_MARKER",
        data: { markerId, confirm },
      });
    },
    [roomId]
  );

  // 마커 삭제
  const deleteMarker = useCallback(
    (markerId: number) => {
      if (!roomId) return;

      const wsClient = WebSocketClient_.getInstance();

      wsClient.send(`/app/room/${roomId}/map`, { action: "DELETE_MARKER", data: { markerId } });
    },
    [roomId]
  );

  // WebSocket 연결 설정
  const connect = useCallback(() => {
    if (!roomId) return;

    const wsClient = WebSocketClient_.getInstance();

    wsClient.setOnConnect(() => {
      console.log("웹소켓 연결 성공");

      wsClient.subscribe(`/topic/room/${roomId}/map`, {
        onMessage: (data) => {
          try {
            const parsedData: MarkerMessage<Marker | Marker[]> =
              typeof data === "string"
                ? JSON.parse(data)
                : (data as MarkerMessage<Marker | Marker[]>);

            switch (parsedData.action) {
              case "ADDED_MARKER":
                setMarkers((prev) => [...prev, parsedData.data as Marker]);
                break;
              case "LIST_MARKERS":
                setMarkers(Array.isArray(parsedData.data) ? parsedData.data : []);
                break;
              case "UPDATED_MARKER": {
                const updatedMarker = parsedData.data as Marker;

                setMarkers((prev) =>
                  prev.map((marker) =>
                    marker.markerId === updatedMarker.markerId ? { ...updatedMarker } : marker
                  )
                );
                break;
              }
              case "DELETED_MARKER": {
                const deleteMessage = (parsedData.data as unknown as { message: string }).message;

                console.log(deleteMessage);
                setMarkers((prev) =>
                  prev.filter((marker) => marker.markerId !== (parsedData.data as Marker).markerId)
                );
                break;
              }
              default:
                console.warn("알 수 없는 액션:", parsedData.action);
            }
          } catch (error) {
            console.error("메시지 처리 중 에러 발생:", error, data);
          }
        },
        onError: (error) => {
          console.error("웹소켓 에러:", error);
          setIsConnected(false);
        },
      });

      setIsConnected(true);
      fetchMarkers(0);
    });

    wsClient.connect(roomId);

    return () => {
      wsClient.disconnect();
      setIsConnected(false);
      setMarkers([]);
    };
  }, [roomId, fetchMarkers]);

  useEffect(() => {
    const cleanup = connect();

    return () => cleanup?.();
  }, [connect]);

  return {
    markers,
    isConnected,
    addMarker,
    updateMarker,
    deleteMarker,
    fetchMarkers,
    addSearchMarker,
  };
};
