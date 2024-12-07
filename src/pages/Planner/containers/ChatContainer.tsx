import { ComponentProps, useMemo } from "react";

import { useTypedParams } from "@common/hooks/useTypedParams";
import Chat from "@components/chat/Chat";
import { ROUTES } from "@routes/type";
import ChatList from "@components/chat/ChatList";
import { useUserProfile } from "../hooks/useUserProfile";
import { useWebSocketChat } from "../hooks/useWebSocketChat";

const mock = "https://picsum.photos/200/300";

type ChatListProps = ComponentProps<typeof ChatList>["dataList"];

const ChatContainer = () => {
  const { roomId } = useTypedParams<typeof ROUTES.ENTER_MODAL>();
  const { userProfile } = useUserProfile();
  const { messages, sendMessage } = useWebSocketChat(roomId, userProfile);

  const transformedMessages: ChatListProps = useMemo(() => {
    return messages.map(({ data }) => ({
      type: userProfile?.email === data.sender ? "sender" : "receiver",
      url: mock,
      text: data.message,
    }));
  }, [messages, userProfile?.email]);

  return (
    <div>
      <Chat myProfile={mock} chatList={transformedMessages} onSubmit={sendMessage} profiles={[]} />
    </div>
  );
};

export default ChatContainer;
