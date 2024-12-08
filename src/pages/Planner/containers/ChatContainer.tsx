import { ComponentProps, useMemo } from "react";

import { useTypedParams } from "@common/hooks/useTypedParams";
import Chat from "@components/chat/Chat";
import { ROUTES } from "@routes/type";
import ChatList from "@components/chat/ChatList";
import { useUserProfile } from "../hooks/useUserProfile";
import { useWebSocketChat } from "../hooks/useWebSocketChat";
import ChatInfoBar from "@components/chat/ChatInfoBar";
import { useRoomInfo } from "../hooks/useRoomInfo";
import { useRoomMemberRemoval } from "../hooks/useRoomMemberRemoval";

type ChatListProps = ComponentProps<typeof ChatList>["dataList"];
type ChatInfoBarProps = ComponentProps<typeof ChatInfoBar>["profiles"];

const ChatContainer = () => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();
  const { userProfile } = useUserProfile();
  const { roomInfo } = useRoomInfo(roomId);
  const { messages, members, sendMessage } = useWebSocketChat(roomId, userProfile);
  const { request } = useRoomMemberRemoval();
  const isHost = userProfile?.email === roomInfo?.hostEmail;

  const transformedMessages: ChatListProps = useMemo(() => {
    return messages.map(({ data }) => ({
      type: userProfile?.email === data.sender ? "sender" : "receiver",
      url: data.profileImage,
      text: data.message,
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
      onSubmit={sendMessage}
      profiles={transformedMembers}
    />
  );
};

export default ChatContainer;
