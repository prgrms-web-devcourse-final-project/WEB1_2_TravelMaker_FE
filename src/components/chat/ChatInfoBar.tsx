import styled from "styled-components";

import ChatProfile from "./ChatProfile";
import { FC } from "react";

interface Props {
  url: string;
}

const ChatInfoBar: FC<Props> = ({ url }) => {
  return (
    <Container>
      <ProfileContent>
        <ChatProfile size={40} url={url} stroke />
      </ProfileContent>
    </Container>
  );
};

export const CHAT_INFO_BAR_HEADER_HEIGHT = 85;

const Container = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: ${CHAT_INFO_BAR_HEADER_HEIGHT}px;
  padding: 20px;
  border-bottom: ${({ theme: { strokeWidth, colors } }) =>
    `${strokeWidth.thick} solid ${colors.secondary.strong}`};
  background-color: ${({ theme }) => `${theme.colors.background.neutral3}99`};
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: ${({ theme: { cornerRadius } }) =>
    `${cornerRadius.extraLarge} ${cornerRadius.extraLarge} 0 0`};
`;

const ProfileContent = styled.div`
  display: flex;
`;

export default ChatInfoBar;
