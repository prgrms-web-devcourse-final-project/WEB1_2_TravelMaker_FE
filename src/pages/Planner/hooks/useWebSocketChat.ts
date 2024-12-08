/* eslint-disable no-console */
import { useState, useCallback, useEffect } from "react";

import { WebSocketClient } from "@common/services/WebSocketClient";
import { UserProfile } from "@api/my/member";

type ChatAction = "BROADCAST_MESSAGE" | "ENTER_ROOM" | "SEND_MESSAGE" | "LIST_MEMBERS";

interface ChatMessage {
  action: ChatAction;
  data: {
    sender: string;
    nickname: string;
    profileImage: string;
    message: string;
    timestamp: string;
  };
}

type ChatMemberData = {
  email: string;
  nickname: string;
  profileImage: string;
};

interface ChatMember {
  action: ChatAction;
  data: ChatMemberData[];
}

export const useWebSocketChat = (roomId: string | undefined, userProfile: UserProfile | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [members, setMembers] = useState<ChatMemberData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const requestRoomMembers = useCallback(() => {
    if (!roomId) {
      console.warn("멤버 리스트 요청 실패: 방 ID 없음");

      return;
    }

    const wsClient = WebSocketClient.getInstance();

    wsClient.send(`/app/room/${roomId}/member`, {
      action: "LIST_MEMBERS",
    });
  }, [roomId]);

  const notifyRoomEntry = useCallback(() => {
    if (!roomId) {
      console.warn("입장 알림 실패: 방 ID 없음");

      return;
    }

    const wsClient = WebSocketClient.getInstance();

    wsClient.send(`/app/room/${roomId}`, {
      action: "ENTER_ROOM",
    });
  }, [roomId]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!roomId) {
        console.warn("메시지 전송 실패: 방 ID 없음");

        return;
      }

      const wsClient = WebSocketClient.getInstance();

      wsClient.send(`/app/room/${roomId}`, {
        action: "SEND_MESSAGE",
        data: { message },
      });
    },
    [roomId]
  );

  const connect = useCallback(() => {
    if (!roomId || !userProfile) {
      console.warn("웹소켓 연결 실패: 필수 정보 누락", { roomId, hasUserProfile: !!userProfile });

      return;
    }

    const wsClient = WebSocketClient.getInstance();

    wsClient.setOnConnect(() => {
      console.log("채팅 웹소켓 연결됨");

      try {
        wsClient.subscribe(`/topic/room/${roomId}`, {
          onMessage: (data) => {
            const message = data as ChatMessage;

            console.log("채팅 메시지 수신:", message);

            if (message.action === "BROADCAST_MESSAGE") {
              setMessages((prev) => [...prev, message]);
            }
          },
          onError: (error) => {
            console.error("채팅 메시지 구독 에러:", error);
            setIsConnected(false);
          },
        });

        wsClient.subscribe(`/topic/room/${roomId}/member`, {
          onMessage: (data) => {
            const message = data as ChatMember;

            console.log("멤버 정보 수신:", message);

            if (message.action === "LIST_MEMBERS") {
              setMembers(message.data);
            }
          },
          onError: (error) => {
            console.error("멤버 정보 구독 에러:", error);
            setIsConnected(false);
          },
        });

        setIsConnected(true);

        setTimeout(() => {
          requestRoomMembers();
          notifyRoomEntry();
        }, 100);
      } catch (error) {
        console.error("웹소켓 초기화 중 에러 발생:", error);
        setIsConnected(false);
      }
    });

    wsClient.connect(roomId);

    return () => {
      console.log("웹소켓 연결 정리");
      wsClient.disconnect();
      setIsConnected(false);
    };
  }, [roomId, userProfile, requestRoomMembers, notifyRoomEntry]);

  useEffect(() => {
    const cleanup = connect();

    return () => cleanup?.();
  }, [connect]);

  return {
    members,
    messages,
    isConnected,
    sendMessage,
    requestRoomMembers,
    notifyRoomEntry,
  };
};
