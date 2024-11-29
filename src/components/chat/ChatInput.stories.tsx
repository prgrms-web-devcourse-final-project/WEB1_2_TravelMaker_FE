import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";

import ChatInput from "./ChatInput";

const meta = {
  title: "Components/Chat/Input",
  component: ChatInput,
  decorators: [
    (Story) => (
      <div style={{ width: 335 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "사용자 입력을 받는 채팅 컴포넌트입니다. 외부 컴포넌트만큼 너비를 전부 차지합니다",
      },
    },
  },
  argTypes: {
    onSubmit: {
      description: "클릭 이벤트 발생 시 호출되는 함수입니다.",
    },
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultChatInput: Story = {
  args: {
    onSubmit: fn(),
  },
};
