import { ComponentProps, FC } from "react";
import styled from "styled-components";

import ChatInfoBar from "./ChatInfoBar";
import { calcResponsive } from "@common/styles/theme";
import ChatList from "./ChatList";
import ChatSubmitter from "./ChatSubmitter";

interface Props {
  isHost?: boolean;
  myProfile?: string;
  profiles: ComponentProps<typeof ChatInfoBar>["profiles"];
  chatList: ComponentProps<typeof ChatList>["dataList"];
  // 수정된 타입
  onSubmit: (message: string) => void; // onSubmit에 message 인자를 받도록 타입 변경
}

const Chat: FC<Props> = ({ myProfile, isHost = false, chatList, profiles, onSubmit }) => {
  return (
    <ChatContainer>
      {/* 상단 */}
      <ChatInfoBar url={myProfile ?? ""} isHost={isHost} profiles={profiles} />
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
  width: ${calcResponsive({ value: 375, dimension: "height", minValue: 300 })};
  height: ${calcResponsive({ value: 750, dimension: "height" })};
  background-color: ${({ theme }) => `${theme.colors.stroke.neutral1}CC`};
  border-radius: ${({ theme: { cornerRadius } }) => cornerRadius.extraLarge};
  border: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.secondary.strong}`};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

export default Chat;
