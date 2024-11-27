import { FC } from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput";

interface Props {
  onSubmit: () => void;
}

const ChatSubmitter: FC<Props> = ({ onSubmit }) => {
  return (
    <Container>
      <ChatInput onSubmit={onSubmit} />
    </Container>
  );
};

const Container = styled.div`
  padding: 25px 20px;
`;

export default ChatSubmitter;
