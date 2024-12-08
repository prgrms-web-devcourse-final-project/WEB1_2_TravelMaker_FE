import { ComponentProps, memo, useMemo } from "react";

import { useTypedParams } from "@common/hooks/useTypedParams";
import Chat from "@components/chat/Chat";
import { ROUTES } from "@routes/type";
import ChatList from "@components/chat/ChatList";
import { useUserProfile } from "../hooks/useUserProfile";
import ChatInfoBar from "@components/chat/ChatInfoBar";
import { useRoomInfo } from "../hooks/useRoomInfo";
import { useRoomMemberRemoval } from "../hooks/useRoomMemberRemoval";
import { useWebSocketChat } from "../hooks/useWebSocketChat";
import { useWebSocketMembers } from "../hooks/useWebSocketMembers";

type ChatListProps = ComponentProps<typeof ChatList>["dataList"];
type ChatInfoBarProps = ComponentProps<typeof ChatInfoBar>["profiles"];

const ChatContainer = memo(() => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();
  const { userProfile } = useUserProfile();
  const { roomInfo } = useRoomInfo(roomId);
  const { messages, sendChatMessage } = useWebSocketChat(roomId);
  const { members } = useWebSocketMembers(roomId);

  const { request } = useRoomMemberRemoval();
  const isHost = userProfile?.email === roomInfo?.hostEmail;

  const transformedMessages: ChatListProps = useMemo(() => {
    return messages.map(({ message, sender, profileImage }) => ({
      type: userProfile?.email === sender ? "sender" : "receiver",
      url: profileImage ?? null,
      text: message,
    }));
  }, [messages, userProfile?.email]);

  const transformedMembers: ChatInfoBarProps = useMemo(() => {
    return members.map(({ profileImage, email }) => {
      const isHost = roomInfo?.hostEmail === email;

      return {
        url: profileImage,

        onHostClick: async (removeUserProfile) => {
          await request({ deletingEmail: email, roomId });
          removeUserProfile();
        },
        isHost,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, roomInfo?.hostEmail]);

  return (
    <Chat
      isHost={isHost}
      myProfile={userProfile?.profileImage ?? ""}
      chatList={transformedMessages}
      onSubmit={sendChatMessage}
      profiles={transformedMembers}
    />
  );
});

export default ChatContainer;
