/* eslint-disable no-console */
import { useWebSocketClient } from "@common/hooks/useWebSocketClient";
import { useCallback, useEffect, useState } from "react";

type MemberWebSocketAction = "LIST_MEMBERS" | "LEAVE_MESSAGE" | "FORCE_EXIT" | "DELETE_ROOM";

interface MemberBaseMessage {
  action: MemberWebSocketAction;
}

interface MemberData {
  email: string;
  nickname: string;
  profileImage: string;
}

interface ListMembersPayload extends MemberBaseMessage {
  action: "LIST_MEMBERS";
  data: MemberData[];
}

interface LeaveMessagePayload extends MemberBaseMessage {
  action: "LEAVE_MESSAGE";
  data: {
    message: string;
  };
}

interface ForceExitPayload extends MemberBaseMessage {
  action: "FORCE_EXIT";
  data: {
    message: string;
  };
}

interface DeleteRoomPayload extends MemberBaseMessage {
  action: "DELETE_ROOM";
  data: {
    message: string;
  };
}

type MemberServerMessage =
  | ListMembersPayload
  | LeaveMessagePayload
  | ForceExitPayload
  | DeleteRoomPayload;

export const useWebSocketMembers = (roomId?: string) => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const { isConnected, sendMessage, subscribe } = useWebSocketClient();
  const [userToKick, setUserToKick] = useState<string | null>(null);
  const [deletedRoom, setDeletedRoom] = useState<boolean>(false);

  const handleMessage = useCallback(({ data, action }: MemberServerMessage) => {
    switch (action) {
      case "LIST_MEMBERS":
        setMembers(data);
        break;
      case "LEAVE_MESSAGE":
        setMembers((prev) => prev.filter((member) => member.email !== data.message));
        break;
      case "FORCE_EXIT":
        setUserToKick(data.message);
        setMembers((prev) => prev.filter((member) => member.email !== data.message));
        break;
      case "DELETE_ROOM":
        setMembers([]);
        setDeletedRoom(true);
        break;
    }
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error("멤버 정보 수신 중 오류 발생:", error);
  }, []);

  useEffect(() => {
    if (isConnected && roomId) {
      const listMembersMessage = {
        action: "LIST_MEMBERS" as const,
      };

      sendMessage(`/app/room/${roomId}/member`, listMembersMessage);

      const unsubscribe = subscribe(`/topic/room/${roomId}/member`, {
        onMessage: handleMessage,
        onError: handleError,
      });

      return () => {
        unsubscribe?.();
      };
    }
  }, [isConnected, roomId, handleMessage, handleError, sendMessage, subscribe]);

  const requestMemberList = useCallback(() => {
    if (!roomId) return;

    const listMembersMessage = {
      action: "LIST_MEMBERS" as const,
    };

    sendMessage(`/app/room/${roomId}/member`, listMembersMessage);
  }, [roomId, sendMessage]);

  return {
    userToKick,
    deletedRoom,
    members,
    requestMemberList,
    isConnected,
  };
};
