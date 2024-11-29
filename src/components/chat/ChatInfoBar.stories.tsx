import styled from "styled-components";
import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";

import ChatInfoBar from "./ChatInfoBar";

const meta = {
  title: "Components/Chat/InfoBar",
  component: ChatInfoBar,
  decorators: [
    (Story) => (
      <MockContainer>
        <Story />
      </MockContainer>
    ),
  ],
  argTypes: {
    url: {
      description: "프로필 이미지의 URL입니다.",
    },
  },
} satisfies Meta<typeof ChatInfoBar>;

export default meta;

const MockContainer = styled.div`
  position: relative;
  width: 375px;
  height: 90px;
`;

type Story = StoryObj<typeof meta>;

export const DefaultChatInfoBar: Story = {
  args: {
    url: "https://picsum.photos/200/300",
    profiles: [
      { url: "https://picsum.photos/200/300", onClick: fn() },
      { url: "https://picsum.photos/200/300", onClick: fn() },
      { url: "https://picsum.photos/200/300", onClick: fn(), isHost: true },
      { url: "https://picsum.photos/200/300", onClick: fn() },
    ],
  },
};
