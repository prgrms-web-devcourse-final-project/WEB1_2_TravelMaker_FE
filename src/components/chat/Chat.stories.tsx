import type { Meta, StoryObj } from "@storybook/react";

import Chat from "./Chat";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Chat/Chat",
  component: Chat,
  argTypes: {
    onSubmit: {
      table: {
        type: {
          summary: "() => void",
        },
      },
    },
    chatList: {
      table: {
        defaultValue: {
          summary: "[]",
        },
        type: {
          summary: "{ type: 'sender' | 'receiver', text: string, url: string | null }[]",
        },
      },
    },
  },
} satisfies Meta<typeof Chat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultChat: Story = {
  args: {
    myProfile: "https://picsum.photos/200/300",
    onSubmit: fn(),
    chatList: [
      { type: "sender", text: "안녕하세요! 오늘 일정 확인 부탁드립니다.", url: null },
      {
        type: "receiver",
        text: "네, 곧 확인하고 답변드릴게요.",
        url: "https://picsum.photos/200/300",
      },
      { type: "sender", text: "감사합니다! 이번 주말에 시간 괜찮으신가요?", url: null },
      {
        type: "receiver",
        text: "주말에 약속이 있어서 조금 어렵습니다.",
        url: "https://picsum.photos/200/300",
      },
      { type: "sender", text: "알겠습니다. 다음 주에 다시 이야기 나누죠!", url: null },
      {
        type: "receiver",
        text: "좋아요! 그때 뵙겠습니다. 😊",
        url: "https://picsum.photos/200/300",
      },
      { type: "sender", text: "네, 감사합니다!", url: null },
    ],
  },
};
