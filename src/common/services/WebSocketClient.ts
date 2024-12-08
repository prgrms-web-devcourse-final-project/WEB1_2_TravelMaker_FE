// WebSocketClient.ts
/* eslint-disable no-console */
import { httpClient } from "@api/fetch";
import { Client } from "@stomp/stompjs";

interface WebSocketMessage {
  action: string;
  data?: unknown;
}

interface WebSocketHandler {
  onMessage: (message: unknown) => void;
  onError?: (error: unknown) => void;
}

export class WebSocketClient {
  socket: WebSocket | null = null;
  getSocket() {
    throw new Error("Method not implemented.");
  }
  private static instance: WebSocketClient;
  private client: Client | null = null;
  private handlers: Map<string, WebSocketHandler> = new Map();
  private roomId: string | null = null;
  private onConnectCallback: (() => void) | null = null;
  private onDisconnectCallback: (() => void) | null = null;
  public isSubscribed: boolean = false;

  private constructor() {}

  static getInstance(): WebSocketClient {
    if (!this.instance) {
      this.instance = new WebSocketClient();
    }

    return this.instance;
  }

  connect(roomId: string): void {
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
      },
      onDisconnect: () => {
        console.log("연결 해제됨");
        this.isSubscribed = false;
        this.onDisconnectCallback?.();
      },
      debug: console.log,
      onStompError: (frame) => {
        console.error("Stomp 에러:", frame);
        this.isSubscribed = false;
      },
    });

    this.client.activate();
  }

  private subscribeToChannels(): void {
    if (!this.client || !this.roomId) {
      console.error("구독 실패: 클라이언트 또는 방 ID 없음");

      return;
    }

    try {
      const channels = [
        `/user/queue/errors`,
        `/topic/room/${this.roomId}`,
        `/topic/room/${this.roomId}/member`,
        `/topic/room/${this.roomId}/map`,
        `/topic/room/${this.roomId}/schedule`,
      ];

      channels.forEach((channel) => {
        this.client?.subscribe(channel, (message) => {
          const handler = this.handlers.get(channel);

          if (!handler) {
            console.warn(`채널 ${channel}에 대한 핸들러가 없습니다`);

            return;
          }

          try {
            const data = JSON.parse(message.body);

            handler.onMessage(data);
          } catch (error) {
            console.error(`메시지 처리 중 에러 발생: ${channel}`, error);
            handler.onError?.(error);
          }
        });
      });

      console.log("WebSocket 구독 완료!");
    } catch (error) {
      console.error("채널 구독 중 에러 발생:", error);
      this.isSubscribed = false;
    }
  }

  setOnConnect(callback: () => void): void {
    this.onConnectCallback = callback;
  }

  setOnDisconnect(callback: () => void): void {
    this.onDisconnectCallback = callback;
  }

  subscribe(channel: string, handler: WebSocketHandler): void {
    this.handlers.set(channel, handler);
  }

  send(destination: string, message: WebSocketMessage): void {
    if (!this.client || !this.client.connected || !this.isSubscribed) {
      console.error("메시지 전송 실패: 연결 상태 확인 필요");

      return;
    }

    console.log("메시지 전송:", message);
    this.client.publish({
      destination,
      body: JSON.stringify(message),
    });
  }

  markAsSubscribed(): void {
    this.isSubscribed = true;
  }

  get isConnected(): boolean {
    return this.client?.connected ?? false;
  }

  disconnect(): void {
    this.isSubscribed = false;
    this.onConnectCallback = null;
    this.onDisconnectCallback = null;
    this.roomId = null;
    this.client?.deactivate();
    this.client = null;
    this.handlers.clear();
  }
}
