import EmptyBox from "@common/styles/EmptyBox";
import { calcResponsiveByPercent } from "@common/styles/theme";
import { FC } from "react";
import styled from "styled-components";
import ChatProfile from "./ChatProfile";

interface SenderMessageProps {
  text: string;
}

interface ReceiverMessageProps extends SenderMessageProps {
  url: string | null;
}

// 상대방 메시지
const ReceiverMessage: FC<ReceiverMessageProps> = ({ text, url }) => {
  return (
    <Container>
      <ProfileContainer>
        <ChatProfile size={30} shadow="small" url={url ?? undefined} />
      </ProfileContainer>
      <Content $type="receiver">
        <Label>{text}</Label>
      </Content>
      <EmptyBox width={40} height={55} />
    </Container>
  );
};

// 본인 메시지
const SenderMessage: FC<SenderMessageProps> = ({ text }) => {
  return (
    <Container>
      <EmptyBox width={100} height={55} flex={{ grow: 1 }} />
      <Content $type="sender">
        <Label>{text}</Label>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileContainer = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 55px;
`;

const Content = styled.div<{ $type: "sender" | "receiver" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  min-width: 55px;
  min-height: ${calcResponsiveByPercent(-15, 55)};
  padding: 17.5px 22px;
  border-radius: 25px;
  border-top-right-radius: ${({ $type }) => ($type === "sender" ? "0px" : null)};
  border-top-left-radius: ${({ $type }) => ($type === "receiver" ? "0px" : null)};
  background-color: ${({
    theme: {
      colors: { primary, secondary },
    },
    $type,
  }) => ($type === "sender" ? primary.strong : secondary.strong)};
`;

const Label = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.colors.background.neutral0};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  white-space: normal;
  overflow-wrap: break-word;
`;

export { ReceiverMessage, SenderMessage };
