import type { Meta, StoryObj } from "@storybook/react";

import { ReceiverMessage, SenderMessage } from "./ChatMessage";

const meta = {
  title: "Components/Chat/Message",
  component: SenderMessage,
  decorators: [
    (Story) => (
      <div style={{ width: 335 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    url: "https://picsum.photos/200/300",
  },
  argTypes: {
    url: {
      description: "receiver 타입인 경우에만 필요합니다.",
    },
  },
} satisfies Meta<typeof ReceiverMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSenderMessage: Story = {
  args: {
    text: "안녕하세요! 반갑습니다!",
  },
};

export const LongTextSenderMessage: Story = {
  args: {
    text: "저도 이번에 새 프로젝트 시작했는데, 디자인 작업에서 어려움을 겪고 있어요. 혹시 디자이너 분들하고 협업할 때 팁 같은 게 있을까요? ",
  },
};

export const DefaultReceiverMessage: Story = {
  render: (args) => {
    return <ReceiverMessage {...args} />;
  },
  args: {
    text: "안녕하세요! 반갑습니다!",
  },
};

export const LongTextReceiverMessage: Story = {
  render: (args) => {
    return <ReceiverMessage {...args} />;
  },
  args: {
    text: "저도 이번에 새 프로젝트 시작했는데, 디자인 작업에서 어려움을 겪고 있어요. 혹시 디자이너 분들하고 협업할 때 팁 같은 게 있을까요? ",
  },
};
