// useWebSocketChat.ts
/* eslint-disable no-console */
import { useWebSocketClient } from "@common/hooks/useWebSocketClient";
import { useCallback, useEffect, useState } from "react";
// types.ts
type WebSocketAction =
  | "ENTER_ROOM"
  | "SEND_MESSAGE"
  | "LIST_MESSAGES"
  | "WELCOME_MESSAGE"
  | "BROADCAST_MESSAGE";

interface BaseMessage {
  action: WebSocketAction;
}

interface MessageData {
  profileImage?: string;
  message: string;
  timestamp: string;
  sender: string;
  nickname?: string;
}

interface SendMessagePayload extends BaseMessage {
  action: "SEND_MESSAGE";
  data: {
    message: string;
  };
}

interface EnterRoomPayload extends BaseMessage {
  action: "ENTER_ROOM";
}

interface ListMessagesPayload extends BaseMessage {
  action: "LIST_MESSAGES";
}

interface WelcomeMessagePayload extends BaseMessage {
  action: "WELCOME_MESSAGE";
  data: {
    sender: "System";
    message: string;
    timestamp: string;
  };
}

interface BroadcastMessagePayload extends BaseMessage {
  action: "BROADCAST_MESSAGE";
  data: MessageData;
}

interface BroadcastMessageListPayload extends BaseMessage {
  action: "LIST_MESSAGES";
  data: MessageData[];
}

type ServerMessage = WelcomeMessagePayload | BroadcastMessagePayload | BroadcastMessageListPayload;

export const useWebSocketChat = (roomId?: string) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { isConnected, sendMessage, subscribe } = useWebSocketClient();

  const handleMessage = useCallback((data: ServerMessage) => {
    if (data.action === "BROADCAST_MESSAGE") {
      setMessages((prev) => [...prev, data.data as MessageData]);
    }

    // 기능 보류
    // if (data.action === "LIST_MESSAGES") {
    //   setMessages(data.data as MessageData[]);
    // }
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error("메시지 수신 중 오류 발생:", error);
  }, []);

  useEffect(() => {
    if (isConnected && roomId) {
      // 입장 메시지 요청
      const enterMessage: EnterRoomPayload = {
        action: "ENTER_ROOM",
      };

      sendMessage(`/app/room/${roomId}`, enterMessage);

      // 채팅 기록 요청 (기능 보류)
      // const listMessage: ListMessagesPayload = {
      //   action: "LIST_MESSAGES",
      // };

      // sendMessage(`/app/room/${roomId}`, listMessage);

      // 메시지 구독
      const unsubscribe = subscribe(`/topic/room/${roomId}`, {
        onMessage: handleMessage,
        onError: handleError,
      });

      return () => {
        unsubscribe?.();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, roomId]);

  const sendChatMessage = useCallback(
    (message: string) => {
      if (!roomId) return;

      const chatMessage: SendMessagePayload = {
        action: "SEND_MESSAGE",
        data: {
          message,
        },
      };

      sendMessage(`/app/room/${roomId}`, chatMessage);
    },
    [roomId, sendMessage]
  );

  const requestMessageList = useCallback(() => {
    if (!roomId) return;

    const listMessage: ListMessagesPayload = {
      action: "LIST_MESSAGES",
    };

    sendMessage(`/app/room/${roomId}`, listMessage);
  }, [roomId, sendMessage]);

  return {
    messages,
    sendChatMessage,
    requestMessageList,
    isConnected,
  };
};
