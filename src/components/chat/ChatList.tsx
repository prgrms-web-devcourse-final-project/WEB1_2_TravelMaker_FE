import styled from "styled-components";
import { FC, useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // 스크롤이 거의 바닥에 있는지 확인 (100px 여유)
      const isNearBottom = scrollHeight <= scrollTop + clientHeight + 100;

      isUserScrollingRef.current = !isNearBottom;
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || isUserScrollingRef.current) return;

    // 새 메시지가 추가될 때 스크롤을 아래로 이동
    container.scrollTop = container.scrollHeight;
  }, [dataList]);

  return (
    <Container ref={containerRef}>
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
