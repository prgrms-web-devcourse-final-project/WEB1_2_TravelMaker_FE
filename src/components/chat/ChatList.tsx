import styled from "styled-components";
import { FC } from "react";

import EmptyBox from "@common/styles/EmptyBox";
import { ReceiverMessage, SenderMessage } from "./ChatMessage";
import { CHAT_INFO_BAR_HEADER_HEIGHT } from "./ChatInfoBar";
import { calcResponsive } from "@common/styles/theme";
import scrollbarStyle from "@common/styles/scrollbarStyle";

interface Props {
  dataList: {
    type: "sender" | "receiver";
    text: string;
    url: string | null;
  }[];
}

const ChatList: FC<Props> = ({ dataList = [] }) => {
  return (
    <Container>
      <EmptyBox fullWidth height={CHAT_INFO_BAR_HEADER_HEIGHT} isResponsive />
      {dataList.map(({ type, text, url }, index) => {
        if (type === "sender") {
          return <SenderMessage key={index} text={text} />;
        }

        return <ReceiverMessage key={index} text={text} url={url} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 ${calcResponsive({ value: 20, dimension: "width" })};
  gap: ${calcResponsive({ value: 25, dimension: "height" })};
  overflow-y: scroll;
  ${scrollbarStyle}
`;

export default ChatList;
