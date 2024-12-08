/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";
import { getTokenString } from "@common/utils/getTokenString";

// 웹소켓 메시지 타입 정의
interface WebSocketMessage {
  action: string;
  data?: any;
}

// 웹소켓 이벤트 핸들러 타입 정의
interface WebSocketHandler {
  onMessage: (message: any) => void;
  onError?: (error: any) => void;
}

// 훅의 반환 타입 정의
export interface UseWebSocketReturn {
  isConnected: boolean;
  sendMessage: (destination: string, message: WebSocketMessage) => void;
  subscribe: (channel: string, handler: WebSocketHandler) => () => void;
}

export const useWebSocket = (roomId: string): UseWebSocketReturn => {
  // 상태 및 ref 관리
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null); // 웹소켓 클라이언트 참조
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map()); // 활성 구독 관리
  const handlersRef = useRef<Map<string, WebSocketHandler>>(new Map()); // 이벤트 핸들러 관리
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>(); // 재연결 타이머 관리
  const mountedRef = useRef(true); // 컴포넌트 마운트 상태 추적

  // 컴포넌트 언마운트 시 마운트 상태 업데이트
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 활성 구독 정리
  const cleanupSubscriptions = useCallback(() => {
    subscriptionsRef.current.forEach((sub) => {
      try {
        sub.unsubscribe();
      } catch (error) {
        console.error("구독 해제 중 에러:", error);
      }
    });
    subscriptionsRef.current.clear();
    handlersRef.current.clear();
  }, []);

  // 웹소켓 클라이언트 정리
  const cleanupClient = useCallback(() => {
    if (clientRef.current) {
      try {
        clientRef.current.deactivate();
      } catch (error) {
        console.error("클라이언트 정리 중 에러:", error);
      }
      clientRef.current = null;
    }
  }, []);

  // 재연결 타이머 정리
  const cleanupReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }
  }, []);

  // 모든 리소스 정리
  const cleanup = useCallback(() => {
    cleanupReconnectTimeout();
    cleanupSubscriptions();
    cleanupClient();
    if (mountedRef.current) {
      setIsConnected(false);
    }
  }, [cleanupReconnectTimeout, cleanupSubscriptions, cleanupClient]);

  // 웹소켓 연결 설정
  const connect = useCallback(() => {
    if (!mountedRef.current) return;
    if (clientRef.current?.connected) return;

    cleanup();

    const client = new Client({
      brokerURL: `/room?access_token=${getTokenString()}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      // 연결 성공 시 기본 채널 구독
      onConnect: () => {
        if (!mountedRef.current) return;
        console.log("웹소켓 연결 성공");
        setIsConnected(true);

        const defaultChannels = [
          `/user/queue/errors`,
          `/topic/room/${roomId}`,
          `/topic/room/${roomId}/member`,
          `/topic/room/${roomId}/map`,
          `/topic/room/${roomId}/schedule`,
        ];

        // 각 채널에 대한 구독 설정
        defaultChannels.forEach((channel) => {
          if (!mountedRef.current) return;
          if (subscriptionsRef.current.has(channel)) {
            const existingSub = subscriptionsRef.current.get(channel);

            try {
              existingSub?.unsubscribe();
            } catch {
              // 명시적 에러 패싱
            }
          }

          const subscription = client.subscribe(channel, (message) => {
            if (!mountedRef.current) return;
            try {
              const data = JSON.parse(message.body);
              const handler = handlersRef.current.get(channel);

              if (handler) handler.onMessage(data);
            } catch (error) {
              const handler = handlersRef.current.get(channel);

              if (handler?.onError) handler.onError(error);
            }
          });

          subscriptionsRef.current.set(channel, subscription);
        });
      },
      // 연결 해제 시 재연결 시도
      onDisconnect: () => {
        if (!mountedRef.current) return;
        console.log("웹소켓 연결 해제");
        setIsConnected(false);

        cleanupReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            connect();
          }
        }, 5000);
      },
      // 에러 처리
      onStompError: (frame) => {
        if (!mountedRef.current) return;
        console.error("Stomp 에러:", frame);
        setIsConnected(false);
      },
    });

    clientRef.current = client;
    client.activate();
  }, [roomId, cleanup, cleanupReconnectTimeout]);

  // 채널 구독 함수
  const subscribe = useCallback((channel: string, handler: WebSocketHandler) => {
    if (!clientRef.current?.connected) {
      throw new Error("웹소켓이 연결되어 있지 않습니다.");
    }

    // 기존 구독 정리
    if (subscriptionsRef.current.has(channel)) {
      const existingSub = subscriptionsRef.current.get(channel);

      existingSub?.unsubscribe();
      subscriptionsRef.current.delete(channel);
    }

    handlersRef.current.set(channel, handler);

    // 새로운 구독 설정
    const subscription = clientRef.current.subscribe(channel, (message) => {
      if (!mountedRef.current) return;
      try {
        const data = JSON.parse(message.body);

        handler.onMessage(data);
      } catch (error) {
        handler.onError?.(error);
      }
    });

    subscriptionsRef.current.set(channel, subscription);

    // 구독 해제 함수 반환
    return () => {
      if (mountedRef.current) {
        subscription.unsubscribe();
        subscriptionsRef.current.delete(channel);
        handlersRef.current.delete(channel);
      }
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = useCallback((destination: string, message: WebSocketMessage) => {
    if (!clientRef.current?.connected) {
      throw new Error("웹소켓이 연결되어 있지 않습니다.");
    }

    clientRef.current.publish({
      destination,
      body: JSON.stringify(message),
    });
  }, []);

  // 컴포넌트 마운트/언마운트 시 연결 관리
  useEffect(() => {
    connect();

    return () => {
      cleanup();
    };
  }, [connect, cleanup]);

  return {
    isConnected,
    sendMessage,
    subscribe,
  };
};
