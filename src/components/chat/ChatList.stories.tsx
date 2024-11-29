import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react";

import ChatList from "./ChatList";

const meta = {
  title: "Components/Chat/List",
  component: ChatList,
  decorators: [
    (Story) => (
      <MockContainer>
        <Story />
      </MockContainer>
    ),
  ],
} satisfies Meta<typeof ChatList>;

export default meta;

const MockContainer = styled.div`
  margin-top: -85px;
  max-width: 375px;
  max-height: 500px;
`;

type Story = StoryObj<typeof meta>;

export const DefaultChatList: Story = {
  args: {
    dataList: [
      {
        type: "sender",
        text: "안녕하세요! 오늘 날씨가 정말 좋네요.",
        url: null,
      },
      {
        type: "receiver",
        text: "그러게요! 이런 날은 산책하기 딱 좋은 날씨죠.",
        url: "https://picsum.photos/200/300",
      },
      {
        type: "receiver",
        text: "혹시 오늘 일정 있으신가요?",
        url: "https://picsum.photos/200/300",
      },
      {
        type: "sender",
        text: "아니요, 오후에 잠깐 시간 괜찮습니다.",
        url: null,
      },
      {
        type: "receiver",
        text: "좋아요. 그럼 오후에 카페에서 뵐까요?",
        url: "https://picsum.photos/200/300",
      },
      {
        type: "sender",
        text: "네, 시간 맞춰 갈게요!",
        url: null,
      },
      {
        type: "receiver",
        text: "알겠습니다. 그럼 이따 뵙겠습니다.",
        url: "https://picsum.photos/200/300",
      },
    ],
  },
};
