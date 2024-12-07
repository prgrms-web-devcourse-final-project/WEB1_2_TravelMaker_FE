import { useState, useCallback, useEffect } from "react";

import { WebSocketClient } from "@common/services/WebSocketClient";
import { UserProfile } from "@api/my/member";

interface ChatMessage {
  action: ChatAction;
  data: {
    sender: string;
    message: string;
    timestamp: string;
  };
}

type ChatAction = "BROADCAST_MESSAGE" | "ENTER_ROOM" | "SEND_MESSAGE";

export const useWebSocketChat = (roomId: string | undefined, userProfile: UserProfile | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (!roomId || !userProfile) return;

    const wsClient = WebSocketClient.getInstance();

    wsClient.connect(roomId);

    wsClient.subscribe(`/topic/room/${roomId}`, {
      onMessage: (data) => {
        const message = data as ChatMessage;

        if (message.action === "BROADCAST_MESSAGE") {
          setMessages((prev) => [...prev, message]);
        }
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error("WebSocket 에러:", error);
        setIsConnected(false);
      },
    });

    setIsConnected(true);
    enterRoom();

    return () => {
      wsClient.disconnect();
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, userProfile]);

  const enterRoom = useCallback(() => {
    if (!isConnected || !roomId) return;

    const wsClient = WebSocketClient.getInstance();

    wsClient.send(`/app/room/${roomId}`, {
      action: "ENTER_ROOM",
    });
  }, [isConnected, roomId]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!isConnected || !roomId) return;

      const wsClient = WebSocketClient.getInstance();

      wsClient.send(`/app/room/${roomId}`, {
        action: "SEND_MESSAGE",
        data: { message },
      });
    },
    [isConnected, roomId]
  );

  useEffect(() => {
    const cleanup = connect();

    return () => cleanup?.();
  }, [connect]);

  return {
    messages,
    isConnected,
    sendMessage,
  };
};
