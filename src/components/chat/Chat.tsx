import { ComponentProps, FC } from "react";
import styled from "styled-components";

import ChatInfoBar from "./ChatInfoBar";
import { calcResponsiveByPercent } from "@common/styles/theme";
import ChatList from "./ChatList";
import ChatSubmitter from "./ChatSubmitter";

interface Props {
  myProfile: string;
  profiles: ComponentProps<typeof ChatInfoBar>["profiles"];
  chatList: ComponentProps<typeof ChatList>["dataList"];
  onSubmit: ComponentProps<typeof ChatSubmitter>["onSubmit"];
}

const Chat: FC<Props> = ({ myProfile, chatList, profiles, onSubmit }) => {
  return (
    <ChatContainer>
      {/* 상단 */}
      <ChatInfoBar url={myProfile} profiles={profiles} />
      {/* 채팅 리스트 */}
      <ChatList dataList={chatList} />
      {/* 메시지 전송 */}
      <ChatSubmitter onSubmit={onSubmit} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  position: relative;
  width: ${calcResponsiveByPercent(-5, 375)};
  height: ${calcResponsiveByPercent(-5, 750)};
  background-color: ${({ theme }) => `${theme.colors.stroke.neutral1}CC`};
  border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.extraLarge};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.secondary.strong}`};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

export default Chat;
