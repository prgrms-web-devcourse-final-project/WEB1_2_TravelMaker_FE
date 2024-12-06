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

/**
 * WebSocket 통신을 위한 클라이언트 클래스
 * 싱글톤 패턴으로 구현되어 애플리케이션 전역에서 하나의 인스턴스만 사용
 */
export class WebSocketClient {
  private static instance: WebSocketClient;
  private client: Client | null = null;
  private handlers: Map<string, WebSocketHandler> = new Map();
  private roomId: string | null = null;

  private constructor() {}

  // 싱글톤 처리
  static getInstance(): WebSocketClient {
    if (!this.instance) {
      this.instance = new WebSocketClient();
    }

    return this.instance;
  }

  /**
   * WebSocket 연결 설정
   * @param roomId 연결할 방 ID
   */
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
      onConnect: () => this.subscribeToChannels(),
      // eslint-disable-next-line no-console
      debug: console.log,
      // eslint-disable-next-line no-console
      onDisconnect: () => console.log("연결 해제됨"),
      onStompError: (frame) => {
        // eslint-disable-next-line no-console
        console.error("Stomp 에러:", frame);
      },
    });

    this.client.activate();
  }

  /** 필요한 모든 채널 구독 설정 */
  private subscribeToChannels(): void {
    if (!this.client || !this.roomId) return;

    const channels = [
      `/user/queue/errors`,
      `/topic/room/${this.roomId}`,
      `/topic/room/${this.roomId}/map`,
      `/topic/room/${this.roomId}/schedule`,
    ];

    channels.forEach((channel) => {
      this.client?.subscribe(channel, (message) => {
        const handler = this.handlers.get(channel);

        if (handler) {
          try {
            const data = JSON.parse(message.body);

            handler.onMessage(data);
          } catch (error) {
            handler.onError?.(error);
          }
        }
      });
    });

    // eslint-disable-next-line no-console
    console.log("WebSocket 연결 성공!");
  }

  /**
   * 특정 채널에 대한 메시지 핸들러 등록
   * @param channel 구독할 채널
   * @param handler 메시지 처리 핸들러
   */
  subscribe(channel: string, handler: WebSocketHandler): void {
    this.handlers.set(channel, handler);
  }

  /**
   * WebSocket 메시지 전송
   * @param destination 메시지를 보낼 채널
   * @param message 전송할 메시지
   */
  send(destination: string, message: WebSocketMessage): void {
    if (!this.client) {
      // eslint-disable-next-line no-console
      console.error("웹소켓이 연결되지 않았습니다");

      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(message),
    });
  }

  /** WebSocket 연결 해제 및 상태 초기화 */
  disconnect(): void {
    this.client?.deactivate();
    this.client = null;
    this.handlers.clear();
  }
}
