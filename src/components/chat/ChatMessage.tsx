import { FC } from "react";
import styled from "styled-components";

import Profile from "./ChatProfile";
import EmptyBox from "@common/styles/EmptyBox";
import { calcResponsive, calcResponsiveValue } from "@common/styles/theme";
import useWindowSize from "@common/hooks/useWindowSize";

interface SenderMessageProps {
  text: string;
}

interface ReceiverMessageProps extends SenderMessageProps {
  url: string | null;
}

// 상대방 메시지
const ReceiverMessage: FC<ReceiverMessageProps> = ({ text, url }) => {
  const { width, height } = useWindowSize();
  const profileSize = calcResponsiveValue({
    window: { width, height },
    value: 30,
    dimension: "height",
  });

  return (
    <Container>
      <ProfileContainer>
        <Profile.Image size={profileSize} shadow="small" url={url ?? undefined} />
      </ProfileContainer>
      <Content $type="receiver">
        <Label>{text}</Label>
      </Content>
      <EmptyBox width={40} height={55} isResponsive />
    </Container>
  );
};

// 본인 메시지
const SenderMessage: FC<SenderMessageProps> = ({ text }) => {
  return (
    <Container>
      <EmptyBox width={100} height={55} flex={{ grow: 1 }} isResponsive />
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
  width: ${calcResponsive({ value: 40, dimension: "height" })};
  height: ${calcResponsive({ value: 55, dimension: "height" })};

  @media (max-width: 1024px) {
    width: ${calcResponsive({ value: 35, dimension: "height" })};
  }
`;

const Content = styled.div<{ $type: "sender" | "receiver" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  min-width: 55px;
  min-height: ${calcResponsive({ value: 55, dimension: "height" })};
  padding: ${calcResponsive({ value: 17.5, dimension: "height" })}${calcResponsive({
      value: 22,
      dimension: "height",
    })};
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
  font-size: ${({ theme }) =>
    calcResponsive({ value: theme.typography.caption.fontSize, dimension: "width", minValue: 11 })};
  white-space: normal;
  overflow-wrap: break-word;
`;

export { ReceiverMessage, SenderMessage };
