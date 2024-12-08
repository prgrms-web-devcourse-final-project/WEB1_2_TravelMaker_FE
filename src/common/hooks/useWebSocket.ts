/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";
import { getTokenString } from "@common/utils/getTokenString";

// 웹소켓으로 주고받을 메시지 타입 정의
interface WebSocketMessage {
  action: string;
  data?: any;
}

// 웹소켓 이벤트 핸들러 타입 정의
interface WebSocketHandler {
  onMessage: (message: any) => void;
  onError?: (error: any) => void;
}

// 웹소켓 훅이 반환하는 값들의 타입 정의
export interface UseWebSocketReturn {
  isConnected: boolean;
  sendMessage: (destination: string, message: WebSocketMessage) => void;
  subscribe: (channel: string, handler: WebSocketHandler) => () => void;
}

export const useWebSocket = (roomId: string): UseWebSocketReturn => {
  // 웹소켓 연결 상태를 관리하는 state
  const [isConnected, setIsConnected] = useState(false);
  // STOMP 클라이언트 인스턴스 참조
  const clientRef = useRef<Client | null>(null);
  // 활성화된 구독들을 저장하는 Map
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());
  // 채널별 이벤트 핸들러를 저장하는 Map
  const handlersRef = useRef<Map<string, WebSocketHandler>>(new Map());
  // 재연결 타이머를 저장하는 ref
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  // 컴포넌트 마운트 상태를 추적하는 ref
  const mountedRef = useRef(true);

  // 웹소켓 연결이 활성 상태인지 확인하는 타입 가드
  const isWebSocketActive = (
    subscription: StompSubscription | undefined
  ): subscription is StompSubscription => {
    return !!(
      subscription &&
      clientRef.current?.connected &&
      clientRef.current?.webSocket?.readyState === 1 &&
      mountedRef.current
    );
  };

  // 활성화된 구독을 안전하게 해제하는 함수
  const unsubscribeIfActive = (subscription: StompSubscription | undefined) => {
    if (isWebSocketActive(subscription)) {
      try {
        subscription.unsubscribe();
      } catch (error) {
        console.warn("구독 해제 중 에러 발생:", error);
      }
    }
  };

  // 컴포넌트 언마운트 시 마운트 상태 플래그를 false로 설정
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 모든 활성 구독을 정리하는 함수
  const cleanupSubscriptions = useCallback(() => {
    subscriptionsRef.current.forEach((sub) => {
      unsubscribeIfActive(sub);
    });
    subscriptionsRef.current.clear();
    handlersRef.current.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // STOMP 클라이언트를 정리하는 함수
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

  // 재연결 타이머를 정리하는 함수
  const cleanupReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = undefined;
    }
  }, []);

  // 모든 웹소켓 관련 리소스를 정리하는 함수
  const cleanup = useCallback(() => {
    cleanupReconnectTimeout();
    cleanupSubscriptions();
    cleanupClient();
    if (mountedRef.current) {
      setIsConnected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 웹소켓 연결을 설정하는 함수
  const connect = useCallback(() => {
    if (!mountedRef.current) return;
    if (clientRef.current?.connected) return;

    cleanup();

    const client = new Client({
      brokerURL: `/room?access_token=${getTokenString()}`,
      reconnectDelay: 3000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      // 연결 성공 시 콜백
      onConnect: () => {
        if (!mountedRef.current) return;
        console.log("웹소켓 연결 성공");
        setIsConnected(true);

        // 기본 구독할 채널들
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

            unsubscribeIfActive(existingSub);
            subscriptionsRef.current.delete(channel);
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
      // 연결 해제 시 콜백
      onDisconnect: () => {
        if (!mountedRef.current) return;
        console.log("웹소켓 연결 해제");
        setIsConnected(false);

        // 3초 후 재연결 시도
        cleanupReconnectTimeout();
        reconnectTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            connect();
          }
        }, 3000);
      },
      // STOMP 에러 발생 시 콜백
      onStompError: (frame) => {
        if (!mountedRef.current) return;
        console.error("Stomp 에러:", frame);
        setIsConnected(false);
        // 0.1초 후 재연결 시도
        setTimeout(() => {
          if (mountedRef.current) {
            connect();
          }
        }, 100);
      },
    });

    clientRef.current = client;
    client.activate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  // 특정 채널에 구독하는 함수
  const subscribe = useCallback((channel: string, handler: WebSocketHandler) => {
    if (!clientRef.current?.connected || clientRef.current?.webSocket?.readyState !== 1) {
      throw new Error("웹소켓이 연결되어 있지 않습니다.");
    }

    // 이미 존재하는 구독 정리
    if (subscriptionsRef.current.has(channel)) {
      const existingSub = subscriptionsRef.current.get(channel);

      unsubscribeIfActive(existingSub);
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
        unsubscribeIfActive(subscription);
        subscriptionsRef.current.delete(channel);
        handlersRef.current.delete(channel);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 메시지를 전송하는 함수
  const sendMessage = useCallback(
    (destination: string, message: WebSocketMessage) => {
      if (!clientRef.current?.connected || clientRef.current?.webSocket?.readyState !== 1) {
        console.warn("웹소켓 연결이 불안정합니다. 재연결을 시도합니다.");
        connect();

        return;
      }

      try {
        clientRef.current.publish({
          destination,
          body: JSON.stringify(message),
        });
      } catch (error) {
        console.warn("메시지 전송 실패:", error);
        connect();
      }
    },
    [connect]
  );

  // 컴포넌트 마운트 시 웹소켓 연결 설정
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
