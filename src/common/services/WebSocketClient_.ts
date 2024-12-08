/* eslint-disable no-console */
import { httpClient, setDefaultsHeaderAuth } from "@api/fetch";
import { Client, StompSubscription } from "@stomp/stompjs";

interface WebSocketMessage {
  action: string;
  data?: unknown;
}

interface WebSocketHandler {
  onMessage: (message: unknown) => void;
  onError?: (error: unknown) => void;
}

/**
 * @deprecated 레거시 웹소켓 시스템 (삭제 예정)
 */
export class WebSocketClient_ {
  private static instance: WebSocketClient_ | null = null;
  private client: Client | null = null;
  private handlers: Map<string, WebSocketHandler> = new Map();
  private roomId: string | null = null;
  private onConnectCallback: (() => void) | null = null;
  private connectionPromise: Promise<void> | null = null;
  private resolveConnection: (() => void) | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();

  private constructor() {
    if (WebSocketClient_.instance) {
      throw new Error("WebSocketClient는 getInstance()를 통해 생성해야 합니다.");
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("유효한 토큰이 없으면 웹소켓 연결이 불가능합니다.");
    }
    setDefaultsHeaderAuth(token);
  }

  public static getInstance(): WebSocketClient_ {
    if (!WebSocketClient_.instance) {
      WebSocketClient_.instance = new WebSocketClient_();
    }

    return WebSocketClient_.instance;
  }

  public static resetInstance(): void {
    if (WebSocketClient_.instance) {
      WebSocketClient_.instance.cleanup();
      WebSocketClient_.instance = null;
    }
  }

  async connect(roomId: string, isStart?: boolean): Promise<void> {
    if (this.isConnected && this.roomId === roomId) return;
    if (!isStart) return;

    this.connectionPromise = new Promise((resolve) => {
      this.resolveConnection = resolve;
    });

    this.roomId = roomId;
    const WS_URL = "/room";
    const authorization = (
      (httpClient.defaults.headers.common?.Authorization as string) ?? "Bearer "
    )
      .replace("Bearer", "")
      .trim();

    this.client = new Client({
      brokerURL: `${WS_URL}?access_token=${authorization}`,
      onConnect: () => {
        this.subscribeToChannels();
        this.onConnectCallback?.();
        this.resolveConnection?.();
      },
      onDisconnect: () => {
        console.log("연결 해제됨");
        this.cleanup(); // disconnect 대신 cleanup 호출
      },
      debug: console.log,
      onStompError: (frame) => {
        console.error("Stomp 에러:", frame);
        this.cleanup(); // disconnect 대신 cleanup 호출
      },
    });

    this.client.activate();

    return this.connectionPromise;
  }

  private cleanup(): void {
    // 기존 연결 정리 전에 자동 재연결 비활성화
    if (this.client) {
      this.client.deactivate(); // 재연결 시도 방지
      this.client.forceDisconnect(); // 강제 연결 해제
    }

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions.clear();
    this.handlers.clear();
    this.client = null;
    this.roomId = null;
    this.onConnectCallback = null;
    this.resolveConnection = null;
    this.connectionPromise = null;
  }

  private subscribeToChannels(): void {
    if (!this.client || !this.roomId) return;

    try {
      const channels = [
        `/user/queue/errors`,
        `/topic/room/${this.roomId}`,
        `/topic/room/${this.roomId}/member`,
        `/topic/room/${this.roomId}/map`,
        `/topic/room/${this.roomId}/schedule`,
      ];

      channels.forEach((channel) => {
        if (this.subscriptions.has(channel)) return;

        const subscription = this.client!.subscribe(channel, (message) => {
          const handler = this.handlers.get(channel);

          if (!handler) return;

          try {
            const data = JSON.parse(message.body);

            handler.onMessage(data);
          } catch (error) {
            handler.onError?.(error);
          }
        });

        this.subscriptions.set(channel, subscription);
      });
    } catch (error) {
      console.error("채널 구독 중 에러 발생:", error);
    }
  }

  setOnConnect(callback: () => void): void {
    this.onConnectCallback = callback;
    if (this.isConnected) {
      callback();
    }
  }

  subscribe(channel: string, handler: WebSocketHandler): void {
    if (this.handlers.has(channel)) return;
    this.handlers.set(channel, handler);
  }

  send(destination: string, message: WebSocketMessage): void {
    if (!this.client?.connected) {
      console.error("메시지 전송 실패: 연결 상태 확인 필요");

      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(message),
    });
  }

  // disconnect 메서드 수정
  disconnect(): void {
    this.cleanup();
    WebSocketClient_.instance = null; // 인스턴스만 null로 설정
  }

  get isConnected(): boolean {
    return this.client?.connected ?? false;
  }
}
