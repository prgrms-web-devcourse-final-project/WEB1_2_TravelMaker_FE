/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from "react";
import { WebSocketClient_ } from "@common/services/WebSocketClient_";

interface UseWebSocketOptions {
  roomId: string;
  enabled?: boolean;
  channels?: string[];
  onMessage?: (data: unknown) => void;
  onError?: (error: unknown) => void;
}

/**
 * @deprecated 레거시 훅 (삭제 예정)
 */
export const useWebSocket_ = ({
  roomId,
  enabled = true,
  channels = [],
  onMessage,
  onError,
}: UseWebSocketOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const wsClientRef = useRef<WebSocketClient_ | null>(null);
  const mountedRef = useRef(true);
  const channelsRef = useRef(channels);
  const callbacksRef = useRef({ onMessage, onError });
  const isInitialMount = useRef(true);

  // 콜백과 채널은 ref로 관리하여 의존성 배열에서 제외
  useEffect(() => {
    callbacksRef.current = { onMessage, onError };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    channelsRef.current = channels;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (!enabled || !roomId || wsClientRef.current?.isConnected) return;

    const setup = async () => {
      try {
        const wsClient = WebSocketClient_.getInstance();

        if (!mountedRef.current) return;

        wsClientRef.current = wsClient;

        wsClient.setOnConnect(() => {
          if (!mountedRef.current) return;
          console.log("웹소켓 연결됨");
          setIsConnected(true);

          channelsRef.current.forEach((channel) => {
            wsClient.subscribe(channel, {
              onMessage: (data) => {
                if (!mountedRef.current) return;
                callbacksRef.current.onMessage?.(data);
              },
              onError: (error) => {
                if (!mountedRef.current) return;
                callbacksRef.current.onError?.(error);
              },
            });
          });
        });

        // 초기 마운트 시에만 true 전달
        await wsClient.connect(roomId, isInitialMount.current);
        isInitialMount.current = false;
      } catch (error) {
        if (!mountedRef.current) return;
        console.error("웹소켓 설정 중 에러:", error);
      }
    };

    setup();

    return () => {
      mountedRef.current = false;
      if (wsClientRef.current) {
        WebSocketClient_.resetInstance();
        wsClientRef.current = null;
        setIsConnected(false);
      }
    };
  }, [roomId, enabled]);

  const sendMessage = useCallback(
    (destination: string, message: { action: string; data?: unknown }) => {
      if (!wsClientRef.current?.isConnected) {
        console.warn("메시지 전송 실패: WebSocket 클라이언트가 연결되지 않음");

        return;
      }
      wsClientRef.current.send(destination, message);
    },
    []
  );

  return {
    isConnected,
    sendMessage,
  };
};
