import { FC } from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput";
import { calcResponsive } from "@common/styles/theme";

interface Props {
  onSubmit: (message: string) => void;
}

const ChatSubmitter: FC<Props> = ({ onSubmit }) => {
  return (
    <ChatInputContainer>
      <ChatInput onSubmit={onSubmit} />
    </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  padding: ${calcResponsive({ value: 5 })}${calcResponsive({ value: 20 })}${calcResponsive({
      value: 25,
    })};
`;

export default ChatSubmitter;
