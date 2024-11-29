import { FC } from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput";

interface Props {
  onSubmit: () => void;
}

const ChatSubmitter: FC<Props> = ({ onSubmit }) => {
  return (
    <ChatInputContainer>
      <ChatInput onSubmit={onSubmit} />
    </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  padding: 5px 20px 25px;
`;

export default ChatSubmitter;
